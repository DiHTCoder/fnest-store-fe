import React from 'react';

const Loading = () => {
    return (
        <div className="flex items-center justify-center">
            <div className="m-20 text-center">
                <span className="loading loading-ring loading-xs"></span>
                <span className="loading loading-ring loading-sm"></span>
                <span className="loading loading-ring loading-md"></span>
                <span className="loading loading-ring loading-lg"></span>
                <p>Đang tải. Vui lòng đợi trong giây lát...</p>
            </div>
        </div>
    );
};

export default Loading;
