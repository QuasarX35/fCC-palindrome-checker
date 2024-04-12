const textInput = document.querySelector('#text-input');
const inputBtn = document.querySelector('#check-btn');
const mainBox = document.querySelector('.main-box');

const cleanString = (str) => {
    // https://stackoverflow.com/questions/6555182/remove-all-special-characters-except-space-from-a-string-using-javascript
    const regex = /[^a-zA-Z0-9]/g;
    return str.replace(regex, ''); // replaces the string with letters, alphabets and numbers only, removing any other symbol
};

const isInvalidInput = (str) => {
    // https://stackoverflow.com/questions/23476532/check-if-string-contains-only-letters-in-javascript
    // const regex = /^[a-zA-Z]+$/i;
    // return !str.match(regex);
    //* freeCodeCamp only requires that the input is not blank
    return !str;
}

const displayErrorMsg = (errorMsg) => {
    //* the commented code adds a red error message as an element instead of using the alert() function required by freeCodeCamp *//
    const errorMsgExists = document.querySelector('.errorMsg');
    if (errorMsgExists) return;

    const errorMsgEl = document.createElement('p');
    errorMsgEl.textContent = errorMsg;
    errorMsgEl.classList.add('error');
    errorMsgEl.classList.add('errorMsg');

    // https://stackoverflow.com/questions/4793604/how-to-insert-an-element-after-another-element-in-javascript-without-using-a-lib
    textInput.parentNode.insertBefore(errorMsgEl, textInput.nextSibling);

    setTimeout(() => {
        errorMsgEl.remove();
    }, '3000');
    //* required by freeCodeCamp *//
    // alert(errorMsg);
}

// first solution that came to mind, most readable solution
const isPalindrome = (str) => {
    for (let i = 0; i < Math.floor(str.length / 2); i++) {
        if (str[i] !== str[str.length - 1 - i]) {
            return false;
        }
    }
    return true;
};

// slightly faster solution
const isPalindrome2 = (str) => {
    // >> shifts the bits of the binary representation of the number to the right
    // so >> 1 siftts the bitwise representation of str.length by 1 to effectively divide it by 2 without any remainder
    // and << 1 does the opposite, multiply by 2
    for (let i = 0; i < str.length >> 1; i++) {
        if (str[i] !== str[str.length - 1 - i]) return false;
    }
    return true;
}

// fastest solution with recursion
const isPalindrome3 = (str, i = 0) => { // if no value is given for i, it defaults to 0
    if (i >= str.length >> 1) return true; // reached half of the string, all characters must match
    if (str[i] !== str[str.length - 1 - i]) return false; // characters not matching, not a palindrome
    return isPalindrome3(str, i + 1); // recursive call with incremented index
}

// more compact
const isPalindrome4 = (str, i = 0) => {
    if (i >= str.length >> 1) return true;
    return str[i] === str[str.length - 1 - i] && isPalindrome4(str, i + 1);
}

// even more compact
const isPalindrome5 = (str, i = 0) => {
    return (i >= str.length >> 1) || (str[i] === str[str.length - 1 - i] && isPalindrome5(str, i + 1));
}

// most compact: https://stackoverflow.com/questions/14813369/palindrome-check-in-javascript
const isPalindrome6=(s,i) => { // i will still default to 0
    return (i=i||0)<0||i>=s.length>>1||s[i]==s[s.length-1-i]&&isPalindrome6(s,++i);
}

const displayResult = (msg) => {
    const result = document.querySelector('#result');
    result.removeAttribute('hidden');
    result.textContent = msg;
}

const checkInput = (e) => {
    e.preventDefault();
    const word = cleanString(textInput.value).toLowerCase();
    
    if (isInvalidInput(word)) {
        displayErrorMsg("Please input a value");
        textInput.value = '';
    } else {
        if (isPalindrome5(word)) {
            displayResult(`${textInput.value} is a palindrome`);
        } else {
            displayResult(`${textInput.value} is not a palindrome`);
        }
    }
}

inputBtn.addEventListener('click', checkInput);