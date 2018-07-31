import React from 'react';
import { Layout } from '../../blocks/app';
import * as User from '../../blocks/user';

const Settings = () => (
    <Layout withHeader={true}>
        <User.Settings />
    </Layout>
);

export default Settings;