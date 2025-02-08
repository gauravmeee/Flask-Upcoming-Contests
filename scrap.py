from platforms import atcoder, codechef, codeforces, hackerearth, hackerrank, geeksforgeeks


def fetchContests():
    result = {}
    contests = []
    contests.extend(codeforces.getCodeforcesContests())
    contests.extend(codechef.getCodechefContests())
    contests.extend(hackerrank.getHackerrankContests())
    contests.extend(hackerearth.getHackerearthContests())
    contests.extend(geeksforgeeks.getGeeksforgeeksContests())
    contests.extend(atcoder.getAtCoderContests())
    contests = sorted(contests, key=lambda contest: contest['startTime'])
    result["contests"] = contests
    return result
