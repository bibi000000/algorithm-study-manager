# from fastapi import FastAPI
# from extractors.indeed import extract_indeed_jobs
# from extractors.wwr import extract_wwr_jobs
# from extractors.onepiece_cover import extract_onepiece_cover_img
from extractors.programmers import \
    extract_programmers_challenges_solved, \
    extract_programmers_challenges_total, \
    save_challenges
from utils.file import save_to_file_programmers

# from file import save_to_file


save_challenges()
# save_to_file_programmers('programmers')