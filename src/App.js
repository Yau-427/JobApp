import { FormProvider } from './context/FormContext';
import { AppRouter } from './router/AppRouter';
import '../src/App.css'
function App() {
    return (
        <FormProvider>
            <AppRouter />
        </FormProvider>
    );
}

export default App;