import React from 'react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Title from '../../components/ui/Title';

const Protocolos = () => {
    return (
        <div className="space-y-8 animate-fade-in">
            <PageHeader
                title="Protocolos Criptográficos"
                description="TLS/SSL, SSH, IPsec y cómo protegemos las comunicaciones."
                gradientFrom="primary"
                gradientTo="success"
            />
            <Card>
                <Title level={2}>Criptografía en Acción</Title>
                <p className="text-(--text-secondary) mt-4">
                    Estudio de los protocolos estándar que utilizan primitivas criptográficas para asegurar el tráfico de red.
                </p>
            </Card>
        </div>
    );
};

export default Protocolos;
