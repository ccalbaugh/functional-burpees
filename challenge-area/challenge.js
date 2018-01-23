const BASE_URL = `https://opentdb.com/api.php?amount=10&category=18`;
const fetchedData = fetchData(BASE_URL);

async function fetchData(url) {
    let fetchedData, jsonifiedData;
    try {
        fetchedData = await fetch(url);
        jsonifiedData = await fetchedData.json();
    } catch (error) {
        console.error(error);
    } finally {
        const results = await jsonifiedData.results;
        return results;
    }
};

async function replaceQuotes(data) {
    let list;
    try {
        list = await data;
    } catch (error) {
        console.error(error);
    } finally {
        const replacedQuotes = list.map( result => result.question = result.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'") );
        console.log(`replacedQuotes: `, replacedQuotes);
        return replacedQuotes;
    }
}

replaceQuotes(fetchedData);

async function pluckByAttr(data, attr, filterVal) {
    let list;
    try {
        list = await data;
    } catch (error) {
        console.error(error);
    } finally {
        const filteredList = list.filter( item => item[attr] === filterVal );
        console.log(`filteredList: `, filteredList);
        return filteredList;
    }
}

const pluckAllEasyQs = pluckByAttr(fetchedData, 'difficulty', 'easy');
pluckAllEasyQs;

async function sortByDifficulty(data) {
    let list;
    try {
        list = await data;
    } catch (error) {
        console.error(error);
    } finally {
        const sortedByDifficulty = [...list].sort((a, b) => {
            if (a.difficulty === 'easy' || b.difficulty === 'hard') { return -1; } 
            else if (a.difficulty === 'hard' || b.difficulty === 'easy') { return 1; }  
            else { return 0; }
        });
        console.log(`list: `, list);
        console.log(`sortedByDifficulty: `, sortedByDifficulty);
        return sortedByDifficulty;
    }
}

const sortedByDifficulty = sortByDifficulty(fetchedData);
sortedByDifficulty;

async function countNumOfAttrs(data, attr) {
    let list;
    try {
        list = await data;
    } catch (error) {
        console.error(error);
    } finally {
        const nums = list.reduce((sum, curr) => {
            const match = curr[attr]
            return Object.assign(sum, { [match]: (sum[match] + 1) });
        }, { 
            "easy": 0, 
            "medium": 0, 
            "hard": 0
        });
        console.log(`nums: `, nums);
        return nums;
    }
}

const countEachDifficulty = countNumOfAttrs(fetchedData, 'difficulty');
countEachDifficulty;

async function checkSame(data, attr, checkVal) {
    let list;
    try {
        list = await data;    
    } catch (error) {
        console.error(error);
    } finally {
        const checked = list.every( item => item[attr] === checkVal );
        console.log(`checked: `, checked);
        return checked;
    }
}

const checkForCompSci = checkSame(fetchedData, 'category', "Science: Computers");
checkForCompSci;

async function grabAndSort(data, grabBy, filterBy, sortBy) {
    let list;
    try {
        list = await data;
    } catch (error) {
        console.error(error);
    } finally {
        const grabbed = await pluckByAttr(list, grabBy, filterBy);
        const sorted = grabbed.sort((a, b) => {
            return a[sortBy] > b[sortBy];
        });
        console.log(`sorted: `, sorted);
        return sorted;
    }
}

const sortMediumByType = grabAndSort(fetchedData, 'difficulty', 'medium', 'type');
sortMediumByType;