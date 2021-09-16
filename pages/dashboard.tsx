import { useContext, useEffect } from "react"

import { Can } from "../components/Can";
import { AuthContext } from "../contexts/AuthContext"
import { useCan } from "../hooks/useCan";
import { setupAPIClient } from "../services/api";
import { api } from "../services/apiClient";
import { withSSRAuth } from "../utils/withSSRAuth";

import styles from '../styles/Home.module.css'

export default function Dashboard() {
    const { user, signOut } = useContext(AuthContext);

    const userCanSeeMetrics = useCan({
        permissions: ['metrics.list']
    })

    useEffect(() => {
        api.get('/me')
            .then(response => console.log(response))
            .catch(err => console.log(err));
    }, [])

    return (
        <div className={styles.container}>
            <h1>Dashboard: {user?.email}</h1>

            {userCanSeeMetrics && <div>Métricas</div>}

            <Can roles={['editor']}>
                <div>Métricas em componente</div>
            </Can>

            <button onClick={signOut}>Sign out</button>
        </div>
    )
}

// não deixar um usuário que não está logado acessar uma página expecífica
export const getServerSideProps = withSSRAuth(async (context) => {
    const apiClient = setupAPIClient(context);
    const response = await apiClient.get('/me');

    return {
        props: {}
    }
});