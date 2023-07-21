// import React from 'react';
// import { shallow, mount, render } from 'enzyme';
// import Header from './header.component';
// import { UserContext } from '../../context/userContext/user.context';
// import { Router, MemoryRouter } from "react-router-dom";

// jest.mock('react-router-dom', () => ({
//     useLocation: jest.fn().mockReturnValue({
//       pathname: 'localhost:3000/',
//     }),
// }));

// describe('render Header', () => {

//     // it("should render Header", () => {
//     //     const wrapper = render(
//     //         <MemoryRouter>
//     //             <Header/>
//     //         </MemoryRouter>
//     //     )
//     //     // const wrapper = mount(<Header />);
//     //     expect(wrapper.find(".HeaderContainer").exists()).toEqual(true)
//     // })


//     it(">>>> should render user first name in header", () => {

//         const wrapper = mount(
//             <UserContext.Provider
//               value={{
//                 id: '1',
//                 first_name: 'Test',
//                 last_name: 'Tester',
//                 email: 'test@test.com',
//                 address: '123 test',
//                 phone: '123124',
//                 city: 'test city',
//                 state: 'ts',
//                 successLogin: jest.fn(),
//                 userLogout: jest.fn(),
//                 updateProfile: jest.fn()
//               }}
//             >
//                 <MemoryRouter>
//                     <Header />
//                 </MemoryRouter>
//             </UserContext.Provider>
//           );
//           expect(wrapper.find(".header-user-name").text()).toEqual("Hola Test");
            
//     })
    
// });


import React from 'react';
import { shallow, render } from 'enzyme';
import Header from './header.component';
import { UserContext } from '../../context/userContext/user.context';


describe('Header Tests', () => {

    const wrapper = shallow(<Header />)

    it('Expect to render Header component', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('To Not display user first name', () => {        
        expect(wrapper.find(".header-user-name")).toHaveLength(0)
    });

    // it('displays user first name in header', () => {
    //     const view = render(<UserContext.Provider value={{ first_name: "Tester"}}><Header /></UserContext.Provider>)
    //     // expect(view.find(".header-user-name")).toHaveLength(1)
    //     // console.log(view[0].children[1])
    // })




})


