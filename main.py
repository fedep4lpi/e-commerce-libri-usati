from scripts import loadFilesToDb
import time

start = time.time()
loadFilesToDb.load()
end = time.time()
delta = end - start
print("took %.2f seconds to process" % delta)