import React from 'react';
import { Dots } from "react-activity";
import "react-activity/dist/library.css";

function ActivityIndicator({text}: { text?: any }) {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <Dots className="dark:text-primary-foreground-muted" />
          {text && <p className="text-sm text-gray-600 dark:text-gray-50 m-1">
            {text}
          </p>}
          </div>
    );
}

export default ActivityIndicator;