import redis
import json
from platforms import atcoder, codechef, codeforces, hackerearth, hackerrank, geeksforgeeks

# Connect to Redis
redis_client = redis.StrictRedis(host="localhost", port=6379, decode_responses=True)

def fetchContests():
    cached_data = redis_client.get("contests_data")
    if cached_data:
        return json.loads(cached_data)  # Return cached results if available

    # Fetch new contest data if cache is empty
    contests = []
    contests.extend(codeforces.getCodeforcesContests())
    contests.extend(codechef.getCodechefContests())
    contests.extend(hackerrank.getHackerrankContests())
    contests.extend(hackerearth.getHackerearthContests())
    contests.extend(geeksforgeeks.getGeeksforgeeksContests())
    contests.extend(atcoder.getAtCoderContests())

    contests = sorted(contests, key=lambda contest: contest['startTime'])
    result = {"contests": contests}

    # Store in Redis for 30 minutes (1800 seconds)
    redis_client.setex("contests_data", 1800, json.dumps(result))

    return result
