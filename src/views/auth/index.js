import React from 'react';
import { Layout } from '../../blocks/app';
import * as User from '../../blocks/user';

const Auth = () => (
    <Layout withHeader={false}>
        <User.Auth />
    </Layout>
);

export default Auth;