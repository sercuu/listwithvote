/* eslint-disable no-undef */
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AddVoteCard from './components/AddVoteCard/AddVoteCard';

Enzyme.configure({ adapter: new Adapter() });

describe('ControlledForm', () => {
  const component = shallow(<AddVoteCard />);
  it('renders successfully', () => {
    component.find('#name').simulate('change', { target: { name: 'name', value: 'name' } });
    component.find('#path').simulate('change', { target: { name: 'path', value: 'path' } });
    component.find('Button').simulate('click');
    const getLocalStorage = localStorage.getItem('voteList');
    expect(getLocalStorage).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: 'name' })]),
    );
  });
});
