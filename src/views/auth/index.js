import React from 'react';
import { Layout } from '../../blocks/app';
import { UserAuth } from '../../blocks/user';

const Auth = () => (
    <Layout withHeader={false}>
        <UserAuth />
    </Layout>
);

export default Auth;