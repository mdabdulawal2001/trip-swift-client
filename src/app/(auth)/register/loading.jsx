
import RegisterSkeleton from '@/components/auth/authSkeletons/RegisterSkeleton';
import React from 'react';

const loading = () => {
    return (
        <div>
            <RegisterSkeleton />
        </div>
    );
};

export default loading;