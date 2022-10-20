const prevOperandLabel = document.querySelector('[data-prev-operand]');
const currOperandLabel = document.querySelector('[data-curr-operand]');
const operationsButtons = document.querySelectorAll('[data-ope]');
const numbersButtons = document.querySelectorAll('[data-nbr]');
const deleteBtn = document.querySelector('[data-delete]');
const resetBtn = document.querySelector('[data-reset]');
const equalBtn = document.querySelector('[data-equals]');
// *********************
const state = {
  currVal: '',
  prevVal: '',
  currOpe: undefined,
  prevOpe: undefined,
  result: '',
  overrideCurrOperandLabel: false,
  overridePrevOperandLable: false,
  overrideCurrVal: true,
  numberWasClickedBefore: false,
  numberContainDot: false,
  euqalBtnWasClicked: false,
  temp: undefined,
  deleteBtnWasClicked: false,
};
const updatePrevOperandLabel = function (val, addToCurText = true) {
  if (addToCurText) prevOperandLabel.textContent += val;
  else prevOperandLabel.textContent = val;
};
const updateCurrOperandLabel = function (val, addToCurText = true) {
  if (addToCurText) {
    currOperandLabel.textContent += val;
  } else currOperandLabel.textContent = val.toLocaleString();
  // if (addToCurText) currOperandLabel.textContent += val;
  // else currOperandLabel.textContent = val;
};
const operate = function (nbr1, nbr2, ope) {
  if (ope === '+') return add(+nbr1, +nbr2);
  if (ope === '-') return substract(+nbr1, +nbr2);
  if (ope === '*') return multiply(+nbr1, +nbr2);
  if (ope === '÷') return devide(+nbr1, +nbr2);
};
const add = function (nbr1, nbr2) {
  return +(nbr1 + nbr2).toFixed(4);
};
const substract = function (nbr1, nbr2) {
  return +(nbr1 - nbr2).toFixed(4);
};
const multiply = function (nbr1, nbr2) {
  return +(nbr1 * nbr2).toFixed(4);
};
const devide = function (nbr1, nbr2) {
  return +(nbr1 / nbr2).toFixed(4);
};
// Number click handler
const handlerNumberClicked = function (e) {
  console.log(state);
  state.euqalBtnWasClicked = false;
  if (
    state.numberContainDot &&
    e.target.dataset.nbr === '.' &&
    currOperandLabel.textContent.includes('.')
  )
    return;
  updateCurrOperandLabel(e.target.dataset.nbr, !state.overrideCurrVal);
  // if (state.overrideCurrVal) state.currVal = e.target.dataset.nbr;
  // When the equal btn was clicked and there were no previos operation
  if (state.overridePrevOperandLable && !state.currOpe) {
    prevOperandLabel.innerHTML = '&nbsp;';
    state.overridePrevOperandLable = false;
  }
  // if (state.currVal == 0) updateCurrOperandLabel('', false);
  if (state.overrideCurrVal) {
    if (!state.deleteBtnWasClicked) {
      state.prevVal = state.currVal;
    }
    state.prevOpe = state.currOpe;
    state.currVal = e.target.dataset.nbr;
  }
  if (!state.overrideCurrVal) state.currVal += e.target.dataset.nbr;
  if (e.target.dataset.nbr === '.') state.numberContainDot = true;
  // state.overrideCurrOperandLabel = false;
  state.overrideCurrVal = false;
  // *
  // state.prevOpe = state.currOpe;
  // *
};
// Operation click handler
const handlerOperationClicked = function (e) {
  // if (!state.currOpe && !state.prevVal && state.euqalBtnWasClicked) return;
  console.log(state);

  state.euqalBtnWasClicked = false;
  state.deleteBtnWasClicked = false;
  // If there is no current value the user won't be able to click an operation
  if (!state.currVal) return;
  state.currOpe = e.target.dataset.ope;
  // state.overrideCurrOperandLabel = true;
  state.overrideCurrVal = true;
  state.numberContainDot = false;
  if (state.prevVal && state.prevOpe) {
    state.currVal = operate(state.prevVal, state.currVal, state.prevOpe);
    if (Math.abs(state.currVal) === Infinity) return handleDevisionProblem();
    state.prevVal = undefined;
    updateCurrOperandLabel(state.currVal, false);
  }
  updatePrevOperandLabel(`${state.currVal}${state.currOpe}`, false);
};
// Equal click handler
const hadnlerEqualClicked = function (e) {
  console.log(state);

  state.deleteBtnWasClicked = false;
  if (!state.currOpe) return;
  // if (!state.currVal && !state.prevVal) return;
  if (!state.prevVal && state.prevVal != 0) return;
  state.euqalBtnWasClicked = true;
  state.result = operate(state.prevVal, state.currVal, state.currOpe);
  if (state.result === Infinity) return handleDevisionProblem();
  updateCurrOperandLabel(state.result, false);
  updatePrevOperandLabel(
    `${state.prevVal}${state.currOpe}${state.currVal}=`,
    false
  );
  state.prevVal = undefined;
  state.currVal = state.result;
  state.overrideCurrVal = true;
  //
  state.currOpe = undefined;
  state.overridePrevOperandLable = true;
  state.numberContainDot = false;
};
// Delete click handler
const handlerDeleteClicked = function (e) {
  console.log(state);

  state.deleteBtnWasClicked = true;
  if (!state.prevVal) state.prevVal = state.currVal;
  if (state.euqalBtnWasClicked) {
    state.euqalBtnWasClicked = false;
    return clearAll();
  }
  const curVal = state.currVal.toString();
  state.currVal = curVal.length > 1 ? curVal.slice(0, -1) : 0;
  if (state.currVal == 0) {
    // state.overrideCurrVal = true;
  }
  if (!state.currOpe) prevOperandLabel.innerHTML = '&nbsp';
  updateCurrOperandLabel(state.currVal, false);
};
// Reset click handler
const clearAll = function () {
  prevOperandLabel.innerHTML = '&nbsp';
  updateCurrOperandLabel('0', false);
  getBackToDefault();
};
const getBackToDefault = function () {
  state.currVal = '';
  state.prevVal = '';
  state.currOpe = undefined;
  state.prevOpe = undefined;
  state.result = '';
  state.overrideCurrOperandLabel = false;
  state.overridePrevOperandLable = false;
  state.overrideCurrVal = true;
  state.numberWasClickedBefore = false;
  state.numberContainDot = false;
  state.deleteBtnWasClicked = false;
};
const handleDevisionProblem = function () {
  updateCurrOperandLabel('Cannot devide by zero!', false);
  return setTimeout(() => {
    clearAll();
  }, 1500);
};
function init() {
  resetBtn.addEventListener('click', clearAll);
  equalBtn.addEventListener('click', hadnlerEqualClicked);
  deleteBtn.addEventListener('click', handlerDeleteClicked);
  // add event listeners to numbers
  numbersButtons.forEach(numberBtn =>
    numberBtn.addEventListener('click', handlerNumberClicked)
  );
  // add evetn listeners to operation
  operationsButtons.forEach(opeBtn =>
    opeBtn.addEventListener('click', handlerOperationClicked)
  );
}
init();
