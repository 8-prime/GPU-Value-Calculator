
def getFpsFromPerformance(perf):
    splitPerf = perf.split()
    if len(splitPerf) >= 2:
        fps = splitPerf[1]
        fps = fps.replace("fps", "")
        return fps[1:-1]
    return ""

def getBrandFromName(name):
    lowerName = name.lower()

    if "nvidia" in lowerName or "geforce" in lowerName or "rtx" in lowerName or "gtx" in lowerName or "titan" in lowerName:
        return "Nvidia"
    if "amd" in lowerName or "radeon" in lowerName:
        return "Amd"
    if "intel" in lowerName:
        return "Intel"


def getCurrentGpuData():
    import requests
    from bs4 import BeautifulSoup
    import json
    import random
    import pricescrape
    import time


    URL = "https://www.tomshardware.com/reviews/gpu-hierarchy,4388.html"
    page = requests.get(URL)
    tomsHardware = BeautifulSoup(page.content, "html.parser")



    captions = tomsHardware.find_all('caption', string="Tom's Hardware Rasterization GPU Benchmarks Hierarchy")
    tables = [caption.find_parent('table') for caption in captions]
    rows = tables[0].find_all('tr')



    gpus = []

    for row in rows:
        time.sleep(20)
        if (row.find_parent('thead')):
            continue

        rowDetails = row.find_all('td')

        gpuName = rowDetails[0].find('a').get_text()
        tenMedium = getFpsFromPerformance(rowDetails[2].get_text())
        tenUltra = getFpsFromPerformance(rowDetails[1].get_text())
        twoKUltra = getFpsFromPerformance(rowDetails[3].get_text())
        fourKUltra = getFpsFromPerformance(rowDetails[4].get_text())
        brand = getBrandFromName(gpuName)
        price = pricescrape.getPriceForGpu(gpuName)


        gpus.append(
            {
                'name': gpuName,
                'tenMedium': tenMedium,
                'tenUltra': tenUltra,
                'twoKUltra': twoKUltra,
                'fourKUltra': fourKUltra,
                'brand': brand,
                'price': price
            }
        )
    
    return gpus

