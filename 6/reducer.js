import {createStore} from 'redux'

const counterReducer = (state = 0, action) => {
	switch (action) {
		case 'INCREMENT':
			return state + 1
		break;
		case 'DECREMENT':
			return state - 1
		break
		default:
		break;
	}
}

const store = createStore(counterReducer)
console.log(store)
