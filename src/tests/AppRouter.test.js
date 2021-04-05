import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { mount, configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { MemoryRouter } from 'react-router';

import LogoutPage from '../components/accounts/LogoutPage';
import LoginPage from '../components/accounts/LoginPage';
import HomePage from '../components/common/HomePage'
import AboutPage from '../components/common/AboutPage';
import NotFoundPage from '../components/common/NotFoundPage';
import AdminPage from '../components/accounts/AdminPage';
import PendingDiagnosisPage from '../components/doctor/PendingDiagnosisPage';
import DiagnosisPage from '../components/doctor/DiagnosisPage';
import CreateDiagnosisPage from '../components/doctor/CreateDiagnosisPage';
import ResultPage from '../components/doctor/ResultPage';
import ResultsPage from '../components/doctor/ResultsPage';
import PatientResultsPage from '../components/doctor/PatientResultsPage';
import PatientsPage from '../components/doctor/PatientsPage';
import DoctorHomePage from '../components/doctor/DoctorHomePage';
import PatientHomePage from '../components/patient/PatientHomePage';
import PResultPage from '../components/patient/ResultPage';
import PDiagnosisPage from '../components/patient/DiagnosisPage';
import GamePage from '../components/patient/GamePage';
import AppRouter from '../components/common/AppRouter'

import { initialAdminState, initialDoctorState, initialPatientState, initialLoggedOutState } from './AppRouterTestConstants'

configure({ adapter: new Adapter() });
const mockStore = configureStore([thunk])

var store
var component

it('does NOT redirect home to login when user not logged in', () => {
    store = mockStore(initialLoggedOutState)
    const component = mount(
        <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
            <AppRouter/>
        </MemoryRouter>
        </Provider>
    );
    expect(component.find(HomePage)).toHaveLength(1);
});

it('routes admin dashboard correctly', () => {
    store = mockStore(initialAdminState)
    const component = mount(
        <Provider store={store}>
        <MemoryRouter initialEntries={['/dashboard']}>
            <AppRouter/>
        </MemoryRouter>
        </Provider>
    );
    expect(component.find(AdminPage)).toHaveLength(1);
});

describe('general routing', () => {
    beforeEach(() => {
        store = mockStore(initialAdminState)
    })
    
    it('routes blank url slug to home page when logged in', () => {
        const component = mount(
        <Provider store={store}>
            <MemoryRouter initialEntries={['/']}>
            <AppRouter/>
            </MemoryRouter>
        </Provider>
        );
        expect(component.find(HomePage)).toHaveLength(1);
    })

    it('routes about url slug to about page when logged in', () => {
        const component = mount(
        <Provider store={store}>
            <MemoryRouter initialEntries={['/about']}>
            <AppRouter/>
            </MemoryRouter>
        </Provider>
        );
        expect(component.find(AboutPage)).toHaveLength(1);
    })

    it('routes not-found url slug to not found page when logged in', () => {
        const component = mount(
        <Provider store={store}>
            <MemoryRouter initialEntries={['/not-found']}>
            <AppRouter/>
            </MemoryRouter>
        </Provider>
        );
        expect(component.find(NotFoundPage)).toHaveLength(1);
    })

    it('routes logout url slug to log out page when logged in', () => {
        const component = mount(
        <Provider store={store}>
            <MemoryRouter initialEntries={['/logout']}>
            <AppRouter/>
            </MemoryRouter>
        </Provider>
        );
        expect(component.find(LogoutPage)).toHaveLength(1);
    })
})

describe('doctor routing', () => {
    beforeEach(() => {
        store = mockStore(initialDoctorState)
    })
    
    it('routes doctor home page', () => {
        const component = mount(
        <Provider store={store}>
            <MemoryRouter initialEntries={['/dashboard']}>
            <AppRouter/>
            </MemoryRouter>
        </Provider>
        );
        expect(component.find(DoctorHomePage)).toHaveLength(1);
    });
    
    it('routes patients page', () => {
        const component = mount(
        <Provider store={store}>
            <MemoryRouter initialEntries={['/patients']}>
            <AppRouter/>
            </MemoryRouter>
        </Provider>
        );
        expect(component.find(PatientsPage)).toHaveLength(1);
    });
    
    it('routes patient results page', () => {
        const component = mount(
        <Provider store={store}>
            <MemoryRouter initialEntries={['/patient/:userEmail']}>
            <AppRouter/>
            </MemoryRouter>
        </Provider>
        );
        expect(component.find(PatientResultsPage)).toHaveLength(1);
    });
    
    it('routes results page', () => {
        const component = mount(
        <Provider store={store}>
            <MemoryRouter initialEntries={['/results']}>
            <AppRouter/>
            </MemoryRouter>
        </Provider>
        );
        expect(component.find(ResultsPage)).toHaveLength(1);
    });
    
    it('routes results page details', () => {
        const component = mount(
        <Provider store={store}>
            <MemoryRouter initialEntries={['/result/:resultId']}>
            <AppRouter/>
            </MemoryRouter>
        </Provider>
        );
        expect(component.find(ResultPage)).toHaveLength(1);
    });
    
    it('routes pending diagnosis page', () => {
        const component = mount(
        <Provider store={store}>
            <MemoryRouter initialEntries={['/diagnosis/pending']}>
            <AppRouter/>
            </MemoryRouter>
        </Provider>
        );
        expect(component.find(PendingDiagnosisPage)).toHaveLength(1);
    });
    
    it('routes create diagnosis page', () => {
        const component = mount(
        <Provider store={store}>
            <MemoryRouter initialEntries={['/diagnosis/:resultId/create']}>
            <AppRouter/>
            </MemoryRouter>
        </Provider>
        );
        expect(component.find(CreateDiagnosisPage)).toHaveLength(1);
    });
  
    it('routes pending diagnosis page', () => {
        const component = mount(
        <Provider store={store}>
            <MemoryRouter initialEntries={['/diagnosis/:resultId']}>
            <AppRouter/>
            </MemoryRouter>
        </Provider>
        );
        expect(component.find(DiagnosisPage)).toHaveLength(1);
    });
})

describe('patient routing', () => {
    beforeEach(() => {
        store = mockStore(initialPatientState)
    })

    it('routes result home page', () => {
        const component = mount(
        <Provider store={store}>
            <MemoryRouter initialEntries={['/dashboard']}>
            <AppRouter/>
            </MemoryRouter>
        </Provider>
        );
        expect(component.find(PatientHomePage)).toHaveLength(1);
    });

    it('routes result page', () => {
        const component = mount(
        <Provider store={store}>
            <MemoryRouter initialEntries={['/result/:resultId']}>
            <AppRouter/>
            </MemoryRouter>
        </Provider>
        );
        expect(component.find(PResultPage)).toHaveLength(1);
    });

    it('routes diagnosis page', () => {
        const component = mount(
        <Provider store={store}>
            <MemoryRouter initialEntries={['/diagnosis/:resultId']}>
            <AppRouter/>
            </MemoryRouter>
        </Provider>
        );
        expect(component.find(PDiagnosisPage)).toHaveLength(1);
    });

    it('routes game page', () => {
        const component = mount(
        <Provider store={store}>
            <MemoryRouter initialEntries={['/game/:resultId']}>
            <AppRouter/>
            </MemoryRouter>
        </Provider>
        );
        expect(component.find(GamePage)).toHaveLength(1);
    });
})