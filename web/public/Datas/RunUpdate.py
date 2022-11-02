import os
import subprocess
from datetime import date
cwd =os.getcwd()
par_cwd= os.path.dirname (os.path.realpath(__file__))
git_cwd= cwd+"\web"
print(cwd)
print(git_cwd)

today = date.today()
subprocess.run(["python","scrap.py"], cwd=f"{par_cwd}").stdout
subprocess.run(["git","add","."], cwd=f"{git_cwd}")
subprocess.run(["git","commit","-m",f"scrap data Update at {today}"], cwd=f"{git_cwd}")
subprocess.run(["git","push"], cwd=f"{git_cwd}")
