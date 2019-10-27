GAME_AREA.style.maxWidth = `${AREA_SIZE * BLOCK_SIZE}px`;

let isXTurn = true;
let field = [];

const initGameArea = () => {
    for (let i = 0; i < AREA_SIZE; i++) {
        for (let j = 0; j < AREA_SIZE; j++) {
            let div = document.createElement('div');
            div.style.height = `${BLOCK_SIZE}px`;
            div.style.width = `${BLOCK_SIZE}px`;
            div.style.border = '1px solid black';
            div.id = `${i}-${j}`;
            div.addEventListener('click', makeTurn);
            GAME_AREA.appendChild(div);
        }
        field.push([0, 0, 0]);
    }
};
const makeTurn = e => {
    let target = e.target;
    if (target.classList.contains('filled')) {
        return;
    }

    let ids = target.id.split('-');
    if (isXTurn) {
        target.innerHTML = 'X';
        field[ids[0]][ids[1]] = 1;
    } else {
        target.innerHTML = 'O';
        field[ids[0]][ids[1]] = -1;
    }
    target.classList.add('filled');

    let winner = getWinner();
    if (winner) {
        if (winner === 1) {
            setTimeout(() => {alert('X win!')});
        } else if (winner === -1) {
            setTimeout(() => {alert('O win!')});
        }
        GAME_AREA.querySelectorAll('div').forEach(el => el.removeEventListener('click', makeTurn));
    }
    isXTurn = !isXTurn;
};
const getWinner = () => {
    let winner;

    field.forEach(row => {
        if (checkIsArrayConsistOfSameNumbers(row)) {
            winner = row[0];
        }
    });

    for (let i = 0; i < AREA_SIZE; i++) {
        let column = field.map(row => row[i]);
        if (checkIsArrayConsistOfSameNumbers(column)) {
            winner = column[0];
        }
    }

    let index = 0;
    let f_diagonal = field.map(el => {
        let res = el[index];
        index++;
        return res;
    });

    index = AREA_SIZE - 1;

    let s_diagonal = field.map(el => {
        let res = el[index];
        index--;
        return res;
    });

    if (checkIsArrayConsistOfSameNumbers(f_diagonal)) {
        winner = f_diagonal[0];
    }
    if (checkIsArrayConsistOfSameNumbers(s_diagonal)) {
        winner = s_diagonal[0];
    }

    if (winner) {
        return winner;
    }
};
const checkIsArrayConsistOfSameNumbers = arr => {
    let uniqValuesOfArr = Array.from(new Set(arr));

    return !!(uniqValuesOfArr.length === 1 && uniqValuesOfArr[0]);
};

initGameArea();
