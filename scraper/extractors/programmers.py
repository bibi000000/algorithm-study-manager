import time
import os
import requests
from github import Github

import urllib3
# import requests
# from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver import Keys
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service as ChromeService
# from selenium.webdriver.chrome.options import Options
# from scraper.extractors.programmers_env import email, password
# from scraper.utils.file import save_to_file_programmers

email = "pound1734@gmail.com"
password = "0828dbff!!"

g = Github(os.environ["KYR_ACCESS_TOKEN"])

http = urllib3.PoolManager()

# options = Options()
options = webdriver.ChromeOptions()
options.add_argument('--headless')  # 실행화면 안보이게 (Background(CLI))
options.add_argument('--disable-dev-shm-usage')
options.add_experimental_option('excludeSwitches', ['enable-logging'])
options.add_experimental_option('detach', True)
service = ChromeService(executable_path=ChromeDriverManager().install())
driver = webdriver.Chrome(options=options, service=service)

base_url = "https://school.programmers.co.kr"
challenges_url = "learn/challenges"
num_per_page = 20   # 한 페이지에 20문제
SECONDS = 2
dict_level = {
    'level-0': 'Lv.0',
    'level-1': 'Lv.1',
    'level-2': 'Lv.2',
    'level-3': 'Lv.3',
    'level-4': 'Lv.4',
    'level-5': 'Lv.5'
}


def create_new_study():
    new_study = """
    |#|제목|난이도|정답률|푼사람수|출제멤버|
    |---|---|---|---|---|---|
    """


def extract_programmers_challenges_total():
    driver.get(f"{base_url}/account/sign_in")
    inputs = driver.find_elements(By.CLASS_NAME, 'FymRFM681OjzOdzor5nk')
    input_email = inputs[0]
    input_password = inputs[1]
    input_email.send_keys(email)
    input_password.send_keys(password)
    button_login = driver.find_element(By.CLASS_NAME, 'itAWTII94uCyf9uUgREi')
    button_login.click()
    _cookies = driver.get_cookies()
    for cookie in _cookies:
        driver.add_cookie(cookie)
    time.sleep(SECONDS)
    driver.get(f'{base_url}/{challenges_url}')
    time.sleep(SECONDS)
    challenges_total = driver.find_element(By.CSS_SELECTOR, "div.total")
    challenges_total_num = int(challenges_total.text.split(' ')[0])
    challenges_problems = []
    for i in range((challenges_total_num//num_per_page)+1):
        driver.get(f'{base_url}/{challenges_url}?page={i+1}')
        time.sleep(SECONDS)
        challenges = driver.find_element(By.TAG_NAME, 'tbody').find_elements(By.TAG_NAME, 'tr')
        time.sleep(SECONDS)
        for j in range(len(challenges)):
            title = challenges[j].find_element(By.CLASS_NAME, 'title')
            level = challenges[j].find_element(By.CLASS_NAME, 'level')
            finished_count = challenges[j].find_element(By.CLASS_NAME, 'finished-count')
            acceptance_rate = challenges[j].find_element(By.CLASS_NAME, 'acceptance-rate')
            solved = challenges[j].find_element(By.CLASS_NAME, 'status')
            challenges_problems.append({
                'title': title.find_element(By.TAG_NAME, 'a').text,
                'link': title.find_element(By.TAG_NAME, 'a').get_attribute('href'),
                'level': dict_level[level.find_element(By.TAG_NAME, 'span').get_attribute('class')],
                'finished_count': finished_count.text,
                'acceptance_rate': acceptance_rate.text,
                'solved': solved.get_attribute('class').split(' ')[1]
            })
    return challenges_problems


def extract_programmers_challenges_solved():
    driver.get(f"{base_url}/account/sign_in")
    inputs = driver.find_elements(By.CLASS_NAME, 'FymRFM681OjzOdzor5nk')
    input_email = inputs[0]
    input_password = inputs[1]
    input_email.send_keys(email)
    input_password.send_keys(password)
    button_login = driver.find_element(By.CLASS_NAME, 'itAWTII94uCyf9uUgREi')
    button_login.click()
    _cookies = driver.get_cookies()
    for cookie in _cookies:
        driver.add_cookie(cookie)
    time.sleep(SECONDS)
    driver.get(f'{base_url}/{challenges_url}?statuses=solved')
    time.sleep(SECONDS)
    challenges_total = driver.find_element(By.CSS_SELECTOR, "div.total")
    challenges_total_num = int(challenges_total.text.split(' ')[0])
    challenges_problems = []
    for i in range((challenges_total_num//num_per_page)+1):
        driver.get(f'{base_url}/{challenges_url}?statuses=solved&page={i+1}')
        time.sleep(SECONDS)
        challenges = driver.find_element(By.TAG_NAME, 'tbody').find_elements(By.TAG_NAME, 'tr')
        time.sleep(SECONDS)
        for j in range(len(challenges)):
            title = challenges[j].find_element(By.CLASS_NAME, 'title')
            level = challenges[j].find_element(By.CLASS_NAME, 'level')
            finished_count = challenges[j].find_element(By.CLASS_NAME, 'finished-count')
            acceptance_rate = challenges[j].find_element(By.CLASS_NAME, 'acceptance-rate')
            solved = challenges[j].find_element(By.CLASS_NAME, 'status')
            challenges_problems.append({
                'title': title.find_element(By.TAG_NAME, 'a').text,
                'link': title.find_element(By.TAG_NAME, 'a').get_attribute('href'),
                'level': dict_level[level.find_element(By.TAG_NAME, 'span').get_attribute('class')],
                'finished_count': finished_count.text,
                'acceptance_rate': acceptance_rate.text,
                'solved': solved.get_attribute('class').split(' ')[1]
            })
    return challenges_problems


def save_challenges():
    challenges_total = extract_programmers_challenges_total()
    save_to_file_programmers('programmers', challenges_total)
    # save_to_file_programmers_test('programmers')


# def save_to_file_programmers_test(file_name):
#     file = open(f'{file_name}.csv', 'w', encoding='utf-8')
#     file.write("title, link, level, finished_count, acceptance_rate\n")
#     file.close()    

def save_to_file_programmers(file_name, problems):
# def save_to_file_programmers(file_name):
    file = open(f'scraper/problems/{file_name}.csv', 'w', encoding='utf-8')
    # file = open(f'problems/{file_name}.csv', 'w', encoding='utf-8')
    file.write("title;link;level;finished_count;acceptance_rate\n")
    for p in problems:
        file.write(f"{p['title']};{p['link']};{p['level']};{p['finished_count']};{p['acceptance_rate']}\n")
    file.close()


