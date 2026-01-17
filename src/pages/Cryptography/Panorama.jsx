import React from 'react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Title from '../../components/ui/Title';

const Panorama = () => {
    return (
        <div className="space-y-8 animate-fade-in">
            <PageHeader
                title="Criptografía: Panorama General"
                description="Visión global de la ciencia de proteger la información."
                gradientFrom="primary"
                gradientTo="success"
            />
            <Card>
                <Title level={2}>Resumen</Title>
                <p className="text-(--text-secondary) mt-4">
                    La criptografía es la práctica y el estudio de las técnicas para la comunicación segura en presencia de terceros (adversarios).
                    En este módulo, exploraremos desde sus orígenes históricos hasta los protocolos modernos que aseguran Internet.
                </p>
            </Card>
        </div>
    );
};

export default Panorama;
