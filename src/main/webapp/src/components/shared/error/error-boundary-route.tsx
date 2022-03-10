// export default function ErrorBoundaryRoute({component: Component, ...rest}: RouteProps) {
//
//     if (!Component) {
//         throw new Error(`A component needs to be specified for path ${(rest as any).path}`);
//     }
//
//     const encloseInErrorBoundary = props => (
//         <ErrorBoundary>
//             <Component {...props} />
//         </ErrorBoundary>
//     );
//     return <Route {...rest} render={encloseInErrorBoundary} />;
// }

const ErrorBoundaryRoute =() => (<></>)
export default ErrorBoundaryRoute
