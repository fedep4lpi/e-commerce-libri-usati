import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.options import Options
import os
import time

RELATIVE_PATH = os.path.abspath("./data/csv")

os.environ['MOZ_HEADLESS'] = '1'

options = Options()
options.set_preference("browser.download.folderList", 2)
options.set_preference("browser.download.manager.showWhenStarting", False)
options.set_preference("browser.download.dir", RELATIVE_PATH)
options.set_preference("browser.helperApps.neverAsk.saveToDisk", "text/csv")


def download_wait():
    seconds = 0
    dl_wait = True
    while dl_wait:
        time.sleep(1)
        dl_wait = False
        for fname in os.listdir(RELATIVE_PATH):
            if fname.endswith('.part'):
                dl_wait = True
        seconds += 1
        if seconds > 500:
            raise TimeoutError('Download csv files require too much time!')
    return seconds


def start():

    driver = webdriver.Firefox(options = options)

    driver.get("https://dati.istruzione.it/opendata/opendata/catalogo/elements1/?area=Adozioni%20libri%20di%20testo")
    elems = driver.find_elements(by = By.CLASS_NAME, value = "csv")

    for elem in elems:
        elem.click()
        print(download_wait())

    driver.close()

    file_list = os.listdir(RELATIVE_PATH)

    for fname in file_list:
        
        regione = "".join(ch for ch in fname if ch.isalpha())
        regione = regione.removeprefix("ALT")
        regione = regione.removesuffix("csv")
        print(regione)