import knex from 'knex';
import knexfile from '../../knexfile';
import Dealer from './dealer';
import Media from './media';
import User from './user';
import Customer from './customer/customer';

const knexInstance = knex(knexfile.development);
const DealerInstance = new Dealer(knexInstance);
const MediaInstance = new Media(knexInstance);
const UserInstance = new User(knexInstance);
const CustomerInstance = new Customer(knexInstance);

export {
  DealerInstance as Dealer,
  MediaInstance as Media,
  UserInstance as User,
  CustomerInstance as Customer,
};
