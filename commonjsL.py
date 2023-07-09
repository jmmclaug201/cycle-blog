# Python Script used to manually get coordinates from gpx file, to be removed
montourFile = open("public/Montour Loop.gpx")

coords = []
minlat = minlon = float('inf')
maxlat = maxlon = -float('inf')
for line in montourFile.readlines():
    if "trkpt lat=" in line:
        vals = line.split('"')
        assert len(vals) == 5
        lat, lon = float(vals[1]), float(vals[3])
        coords.append([lon, lat])
        minlat, maxlat = min(minlat, lat), max(maxlat, lat)
        minlon, maxlon = min(minlon, lon), max(maxlon, lon)

outputFile = open("public/Montour Loop Info.txt", "w")
outputFile.write(str(coords)+"\n")
outputFile.write(str(minlon) + " " + str(maxlon) + " " + str(minlat) + " " + str(maxlat))