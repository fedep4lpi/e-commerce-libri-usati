import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.options import Options
import os
import time
import shutil
import sqlite3

CSV_RELATIVE_PATH = os.path.abspath("./data/csv")
DB_RELATIVE_PATH = os.path.abspath("./data/db.sqlite3")

os.environ['MOZ_HEADLESS'] = '1'

options = Options()
options.set_preference("browser.download.folderList", 2)
options.set_preference("browser.download.manager.showWhenStarting", False)
options.set_preference("browser.download.dir", CSV_RELATIVE_PATH)
options.set_preference("browser.helperApps.neverAsk.saveToDisk", "text/csv")


def download_wait():
    seconds = 0
    dl_wait = True
    while dl_wait:
        time.sleep(1)
        dl_wait = False
        for fname in os.listdir(CSV_RELATIVE_PATH):
            if fname.endswith('.part'):
                dl_wait = True
        seconds += 1
        if seconds > 500:
            raise TimeoutError('Download csv files require too much time!')
    return seconds


def load():

    """ try:
        shutil.rmtree(CSV_RELATIVE_PATH)
    except:
        pass

    driver = webdriver.Firefox(options = options)

    driver.get("https://dati.istruzione.it/opendata/opendata/catalogo/elements1/?area=Adozioni%20libri%20di%20testo")
    elems = driver.find_elements(by = By.CLASS_NAME, value = "csv")

    for elem in elems:
        elem.click()
        download_wait()

    time.sleep(1)
    driver.close() """

    db = sqlite3.Connection(DB_RELATIVE_PATH)

    db.execute("""--sql
        DROP TABLE IF EXISTS Adozione_libri;
    """)

    db.execute("""--sql
        CREATE TABLE Adozione_libri (
            id INTEGER,
            codicescuola TEXT,
            annocorso INTEGER,
            sezioneanno	TEXT,
            tipogradoscuola	TEXT,
            combinazione TEXT,
            disciplina TEXT,
            codiceisbn TEXT,
            autori TEXT,
            titolo TEXT,
            sottotitolo TEXT,
            volume TEXT,
            editore TEXT,
            prezzo REAL,
            nuovaadoz INTEGER,
            daacquist INTEGER,
            consigliato INTEGER,
            regione TEXT,
            PRIMARY KEY(id),
            FOREIGN KEY(codiceisbn) REFERENCES Isbn_libri(codiceisbn)
        );
    """)

    file_list = os.listdir(CSV_RELATIVE_PATH)
    for fname in file_list:

        df = pd.read_csv(CSV_RELATIVE_PATH+'/'+fname, low_memory=False)

        df.columns= df.columns.str.lower()
        
        regione = "".join(ch for ch in fname if ch.isalpha())
        regione = regione.removeprefix("ALT")
        regione = regione.removesuffix("csv")
        df['regione'] = regione

        booleans = ["nuovaadoz","daacquist"]
        for boolean in booleans:
            df[boolean] = df[boolean].replace('Si', 1)
            df[boolean] = df[boolean].replace('No', 0)

        df["prezzo"] = df["prezzo"].replace(',','.', regex=True)
        df["prezzo"] = df["prezzo"].astype('float')

        df["sottotitolo"] = df["sottotitolo"].replace('ND', None)

        df.to_sql(name='Adozione_libri', con=db, if_exists='append', index=False)

    db.execute("""--sql
        DROP TABLE IF EXISTS Isbn_libri;
    """)

    db.execute("""--sql
        CREATE TABLE Isbn_libri (
            id INTEGER,
            codiceisbn TEXT UNIQUE,
            autori TEXT,
            titolo TEXT,
            sottotitolo TEXT,
            disciplina TEXT,
            volume TEXT,
            editore TEXT,
            prezzo REAL,
            PRIMARY KEY(id)
        );
    """)

    db.execute("""--sql
        INSERT INTO Isbn_libri(codiceisbn, autori, titolo, sottotitolo, disciplina, volume, editore, prezzo)
        SELECT codiceisbn, autori, titolo, sottotitolo, disciplina, volume, editore, prezzo
        FROM Adozione_libri
        GROUP BY codiceisbn;
    """)
    db.commit()

    columns_to_delete = ["autori", "titolo", "sottotitolo", "disciplina", "volume", "editore", "prezzo"]
    for column in columns_to_delete:
        db.execute(f"""--sql
            ALTER TABLE Adozione_libri
            DROP COLUMN {column};
        """)
    db.commit()
    
    db.close()

    """ shutil.rmtree(CSV_RELATIVE_PATH) """