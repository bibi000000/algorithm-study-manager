def save_to_file_programmers(file_name, problems):
# def save_to_file_programmers(file_name):
    file = open(f'problems/{file_name}.csv', 'w', encoding='utf-8')
    file.write("title, link, level, finished_count, acceptance_rate\n")
    for p in problems:
        file.write(f"{p['title']},{p['link']},{p['level']},{p['finished_count']},{p['acceptance_rate']}\n")
    file.close()


# 'title': title.find_element(By.TAG_NAME, 'a').text,
# 'link': title.find_element(By.TAG_NAME, 'a').get_attribute('href'),
# 'level': dict_level[level.find_element(By.TAG_NAME, 'span').get_attribute('class')],
# 'finished_count': finished_count.text,
# 'acceptance_rate': acceptance_rate.text,
# 'solved': solved.get_attribute('class').split(' ')[1]