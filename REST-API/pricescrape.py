
def generateQueryString(gpuname):
    return "https://geizhals.de/?fs=" + gpuname + "&hloc=de"


def getPriceForGpu(gpuname):
    print(gpuname)
    COUNTLIMI = 10

    import requests
    from bs4 import BeautifulSoup
    import json
    import random

    URL = generateQueryString(gpuname)
    page = requests.get(URL)
    geizhals = BeautifulSoup(page.content, "html.parser")

    prices =  geizhals.find_all("span", class_="price")

    price_average = 0
    divide_by = 0

    for index, price in enumerate(prices):
        divide_by = index
        if (index >= COUNTLIMI):
            break
        
        price_average += float(price.get_text().replace("€", "").strip().replace(",", "."))
    if (divide_by > 0):
        price_average /= divide_by

    return price_average


getPriceForGpu("GeForce GTX 780")