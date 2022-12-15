
def getFpsFromPerformance(perf):
    splitPerf = perf.split()
    print(splitPerf)
    if len(splitPerf) >= 2:
        fps = splitPerf[1]
        print(fps)
        return fps[1:-1]

    return ""

def getBrandFromName(name):
    lowerName = name.lower()

    if lowerName.contains("nvidia") or lowerName.contains("geforce") or lowerName.contains("rtx") or lowerName.contains("gtx") or lowerName.contains("titan"):
        return "Nvidia"
    if lowerName.contains("amd") or lowerName.contains("radeon"):
        return "Amd"
    if lowerName.contains("intel"):
        return "Intel"


def getCurrentGpuData():
    import requests
    from bs4 import BeautifulSoup
    import json

    URL = "https://www.tomshardware.com/reviews/gpu-hierarchy,4388.html"
    page = requests.get(URL)
    tomsHardware = BeautifulSoup(page.content, "html.parser")



    captions = tomsHardware.find_all('caption', string="Tom's Hardware Rasterization GPU Benchmarks Hierarchy")
    tables = [caption.find_parent('table') for caption in captions]
    rows = tables[0].find_all('tr')



    gpus = []

    for row in rows:
        if (row.find_parent('thead')):
            continue

        rowDetails = row.find_all('td')

        gpuName = rowDetails[0].find('a').get_text()
        tenMedium = getFpsFromPerformance(rowDetails[1].get_text())
        tenUltra = getFpsFromPerformance(rowDetails[2].get_text())
        twoKUltra = getFpsFromPerformance(rowDetails[3].get_text())
        fourKUltra = getFpsFromPerformance(rowDetails[4].get_text())
        # brand = getBrandFromName(gpuName)


        gpus.append(
            {
                'name': gpuName,
                'tenMedium': tenMedium,
                'tenUltra': tenUltra,
                'twoKUltra': twoKUltra,
                'fourKUltra': fourKUltra,
                # 'brand': brand
            }
        )
    
    return gpus

