import os
import subprocess
from datetime import date
from pathlib import Path
cwd =os.getcwd()
par_cwd= os.path.dirname (os.path.realpath(__file__))
print(par_cwd)
today = date.today()
subprocess.run(["python","scrap.py"], cwd=f"{par_cwd}").stdout
subprocess.run(["git","add","."], cwd=f"{par_cwd}")
subprocess.run(["git","commit","-m",f"scrap data Update at {today}"], cwd=f"{par_cwd}")
subprocess.run(["git","push"], cwd=f"{par_cwd}")

'''subprocess.run(["pause"])'''
