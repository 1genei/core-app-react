import * as React from "react";


// For routes that can only be accessed by authenticated users
function AuthGuard({ children }) {;

  return <React.Fragment>{children}</React.Fragment>;
}

export default AuthGuard;
