
import LoginSkeleton from '@/components/auth/authSkeletons/LoginSkeleton';
import React from 'react';

const Loading = () => {
    return (
        <div>
            <LoginSkeleton />
        </div>
    );
};

export default Loading;