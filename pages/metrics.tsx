import { setupAPIClient } from "../services/api";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function Metrics() {
    return (
        <>
            <h1>Métricas</h1>
        </>
    )
}

// não deixar um usuário que não está logado e não tem permissão acessar uma página expecífica
export const getServerSideProps = withSSRAuth(async (context) => {
    const apiClient = setupAPIClient(context);
    const response = await apiClient.get('/me');

    return {
        props: {}
    }
}, {
    permissions: ['metrics.list'],
    roles: ['administrator']
});