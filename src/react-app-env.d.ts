/// <reference types="react-scripts" />
declare module 'easyvk-audio'


declare namespace NodeJS {
      interface ProcessEnv {
        REACT_APP_VK_CLIENT_ID: string;
        REACT_APP_VK_REDIRECT_URI: string;
        REACT_APP_VK_DISPLAY: string;
        REACT_APP_VK_SCOPE: string
        REACT_APP_VK_RESPONSE_TYPE: string
    }
  }
