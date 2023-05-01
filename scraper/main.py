# from fastapi import FastAPI
# from extractors.indeed import extract_indeed_jobs
# from extractors.wwr import extract_wwr_jobs
# from extractors.onepiece_cover import extract_onepiece_cover_img
from extractors.programmers import \
    extract_programmers_challenges_solved
# from file import save_to_file


# extract_onepiece_cover_img()

extract_programmers_challenges_solved()


# app = FastAPI()
#
#
# @app.get("/")
# async def root():
#     # keyword = input("What do you want to search for?")
#     keyword = "python"
#     indeed = extract_indeed_jobs(keyword)
#     wwr = extract_wwr_jobs(keyword)
#     jobs = indeed + wwr
#     return {"result": jobs}
#

