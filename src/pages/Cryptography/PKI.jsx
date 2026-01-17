import React from 'react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Title from '../../components/ui/Title';

const PKI = () => {
    return (
        <div className="space-y-8 animate-fade-in">
            <PageHeader
                title="Infraestructura de Clave Pública (PKI)"
                description="Gestión de certificados, autoridades de certificación y confianza."
                gradientFrom="primary"
                gradientTo="success"
            />
            <Card>
                <Title level={2}>Gestión de Confianza</Title>
                <p className="text-(--text-secondary) mt-4">
                    Cómo se gestionan, distribuyen y revocan los certificados digitales que autentican identidades en la red.
                </p>
            </Card>
        </div>
    );
};

export default PKI;
