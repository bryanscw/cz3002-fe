import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { mount, configure, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router';
import Adapter from 'enzyme-adapter-react-16';
import Index from '../components/patient/GamePage/index.js';
import Game from '../components/patient/GamePage/game/Game.js';
import AppRouter from '../components/common/AppRouter'
import toJson from 'enzyme-to-json';

configure({ adapter: new Adapter() });
const mockStore = configureStore([thunk])
const initialState = {
    "authReducer": {
        "userLoading": false,
        "userFailed": false,
        "user": {
            "email": "patient1@test.com",
            "role": "ROLE_PATIENT",
            "name": "patient1",
            "dob": "1967-01-02T00:00:00.000+00:00",
            "gender": "MALE"
        },
        "access_token": "b7b2a2ff-6a69-43e9-a783-8625e410ac40",
        "refresh_token": "d842dbf9-29bb-4e93-891a-589bac2e8743",
        "expires_in": "7199",
        "time_token_acquired": "Sat Apr 03 2021 00:47:44 GMT+0800 (Singapore Standard Time)"
    },
    "usersReducer": {
        "isLoading": {
            "CREATE": true,
            "RETRIEVE": true,
            "UPDATE": true,
            "DELETE": true,
            "LIST": true
        },
        "hasFailed": {},
        "items": [],
        "item": null
    },
    "errorsReducer": {
        "errors": []
    },
    "resultsReducer": {
        "isLoading": {
            "CREATE": true,
            "RETRIEVE": false,
            "UPDATE": true,
            "DELETE": true,
            "LIST": true
        },
        "hasFailed": {
            "CREATE": true,
            "RETRIEVE": false,
            "UPDATE": true,
            "DELETE": true,
            "LIST": true
        },
        "items": [],
        "item": {
            "id": 163,
            "createdBy": "doctor1@test.com",
            "createdDate": "2021-04-02T16:47:34.903+00:00",
            "lastModifiedBy": "doctor1@test.com",
            "lastModifiedDate": "2021-04-02T16:47:34.903+00:00",
            "user": {
                "email": "patient1@test.com",
                "role": "ROLE_PATIENT",
                "name": "patient1",
                "dob": "1967-01-02T00:00:00.000+00:00",
                "gender": "MALE"
            },
            "accuracy": null,
            "time": null,
            "nodeNum": 20,
            "diagnosis": null
        }
    },
    "diagnosisReducer": {
        "isLoading": {
            "CREATE": true,
            "RETRIEVE": true,
            "UPDATE": true,
            "DELETE": true,
            "LIST": true
        },
        "hasFailed": {},
        "items": [],
        "item": null
    },
    "accGraphReducer": {
        "isLoading": {
            "CREATE": true,
            "RETRIEVE": true,
            "UPDATE": true,
            "DELETE": true,
            "LIST": true
        },
        "hasFailed": {},
        "items": [],
        "item": null
    },
    "timeGraphReducer": {
        "isLoading": {
            "CREATE": true,
            "RETRIEVE": true,
            "UPDATE": true,
            "DELETE": true,
            "LIST": true
        },
        "hasFailed": {},
        "items": [],
        "item": null
    }
}
var store
var component

beforeEach(() => {
    store = mockStore(initialState)
    component = mount(
        <Provider store={store}>
            <MemoryRouter initialEntries={['/game/:resultId']}>
            <AppRouter/>
            </MemoryRouter>
        </Provider>
    ).find('GamePage')
})

it('contains game board', () => {
    expect(component.find(Game)).toHaveLength(1)
})