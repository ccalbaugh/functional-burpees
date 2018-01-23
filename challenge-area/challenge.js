const BASE_URL = `https://opentdb.com/api.php?amount=10&category=18`;

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

const fetchedData = fetchData(BASE_URL);

async function replaceQuotes(data) {
    const list = await data;
    const replacedQuotes = list.map( result => result.question = result.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'") );
    console.log(`replacedQuotes: `, replacedQuotes);
}

replaceQuotes(fetchedData);

async function filterByAttr(data, attr, filterVal) {
    const list = await data;
    const filteredList = list.filter( item => item[attr] === filterVal );
    console.log(`filteredList: `, filteredList);
}

const filterByDifficulty = filterByAttr(fetchedData, 'difficulty', 'easy');
filterByDifficulty;

async function sortByDifficulty(data) {
    const list = await data;
    const sortedByDifficulty = list.sort((a, b) => {
        if (a.difficulty === 'easy' || b.difficulty === 'hard') { return -1; } 
        else if (a.difficulty === 'hard' || b.difficulty === 'easy') { return 1; }  
        else { return 0; }
    });
    console.log(`sortedByDifficulty: `, sortedByDifficulty);
}

sortByDifficulty(fetchedData);

async function numOfEachDiff(data) {
    const list = await data;
    const nums = list.reduce((sum, curr) => {
        const difficulty = curr.difficulty;
        return Object.assign(sum, { [difficulty]: sum[difficulty] + 1 });
    }, { 
        "easy": 0, 
        "medium": 0, 
        "hard": 0
    });
    console.log(`nums: `, nums);
}

numOfEachDiff(fetchedData);

async function checkSameCategory(data, category) {
    const list = await data;
    const checked = list.every( item => item.category === category );
    console.log(`checked: `, checked);
}

const checkForCompSci = checkSameCategory(fetchedData, "Science: Computers");
checkForCompSci;