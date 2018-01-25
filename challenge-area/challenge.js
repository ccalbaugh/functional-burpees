const BASE_URL = 'https://opentdb.com/api.php?amount=10&category=18';

async function fetchPromisedQuestions(url) {
    try {
        const fetchedData = await fetch(url);
        const jsonifiedData = await fetchedData.json();
        return await jsonifiedData.results;
    } catch (error) {
        console.error(error);
    } 
};

const replaceAllQuotes = (list) => {
    const replacedQuotes = list.map( result => ({ ...result, question: result.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'")}) );
    console.log(`replacedQuotes: `, replacedQuotes);
    return replacedQuotes;
}

const replacedSingleAndDoubleQuotes = fetchPromisedQuestions(BASE_URL).then(replaceAllQuotes);
replacedSingleAndDoubleQuotes;

const pluckByAttr = (dataArr, attr, pluckValue) => {
    const filteredList = dataArr.filter( item => item[attr] === pluckValue );
    console.log(`filteredList: `, filteredList);
    return filteredList;
}

const pluckAllEasyQs = fetchPromisedQuestions(BASE_URL).then(fetchedData => pluckByAttr(fetchedData, 'difficulty', 'easy'));
pluckAllEasyQs;

const sortByDifficulty = (dataArr) => {
    const sortedByDifficulty = [...dataArr].sort((a, b) => {
        if (a.difficulty === 'easy' || b.difficulty === 'hard') { return -1; } 
        else if (a.difficulty === 'hard' || b.difficulty === 'easy') { return 1; }
    });
    console.log(`sortedByDifficulty: `, sortedByDifficulty);
    return sortedByDifficulty;
};

const sortedByDifficulty = fetchPromisedQuestions(BASE_URL).then(sortByDifficulty);
sortedByDifficulty;

const countNumberOfEachAttrValue = (dataArr, attr) => {
    const nums = dataArr.reduce((sum, curr) => {
        const match = curr[attr]
        return Object.assign(sum, { [match]: ++sum[match] });
    }, { 
        "easy": 0, 
        "medium": 0, 
        "hard": 0
    });
    console.log(`nums: `, nums);
    return nums;
};

const countEachDifficulty = fetchPromisedQuestions(BASE_URL).then(fetchedData => countNumberOfEachAttrValue(fetchedData, 'difficulty'));
countEachDifficulty;

const checkAllSameValue = (dataArr, attr, checkVal) => {
    const checked = dataArr.every( item => item[attr] === checkVal );
    console.log(`checked: `, checked);
    return checked;
};

const checkForCompSci = fetchPromisedQuestions(BASE_URL).then(fetchedData => checkAllSameValue(fetchedData, 'category', "Science: Computers"));
checkForCompSci;

const grabAndSort = (dataArr, grabBy, filterBy, sortBy) => {
    const sorted = pluckByAttr(dataArr, grabBy, filterBy).sort( (a, b) => a[sortBy] > b[sortBy] );
    console.log(`sorted: `, sorted);
    return sorted;
};

const sortMediumByType = fetchPromisedQuestions(BASE_URL).then(fetchedData => grabAndSort(fetchedData, 'difficulty', 'medium', 'type'));
sortMediumByType;