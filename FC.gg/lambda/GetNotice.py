from bs4 import BeautifulSoup
import requests
# import json

def GetNotice() :
    url = "http://fconline.nexon.com/news/notice/list/rss"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")

    titles = soup.find_all('span', class_='td subject')
    cates = soup.find_all('span', class_='td sort')
    dates = soup.find_all('span', class_='td date')
    counts = soup.find_all('span', class_='td count')
    hrefs = []
    result = []
    normal_notice = []
    for tag in soup.find_all('div', class_=['tr notice', 'tr']):
        link_tag = tag.find('a')
        if link_tag:
            hrefs.append(link_tag['href'])
   
    a = 0
    for i in counts :
        if i.text == '-':
            a += 1




    for title, date, cate, href in zip(titles[:a], dates[:a], cates[:a], hrefs[:a]):
        result.append({
            "category": cate.text.strip(),
            "date": date.text.strip(),
            "title": title.text.strip(),
            "href": "https://fconline.nexon.com/"+href
        })


    for title, date, cate , href in zip(titles[a:], dates[a:], cates[a:], hrefs[a:]):
        normal_notice.append({
            "category": cate.text.strip(),
            "date": date.text.strip(),
            "title": title.text.strip(),
            "href": "https://fconline.nexon.com/"+href
        })


    response_data = {
        "특별공지": result,
        "일반공지": normal_notice
    }
    return response_data