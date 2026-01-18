import React from 'react';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

const ComparisonCard = ({
    icon: Icon,
    title,
    subtitle,
    description,
    pros,
    cons,
    color = "info", // "info", "warning", "success", "error", "accent"
    footer
}) => {
    // Definimos colores dinámicos basados en la prop 'color'
    const colorClasses = {
        info: {
            headerBg: 'bg-info/10',
            iconText: 'text-info',
            titleText: 'text-(--text-primary)',
            subtitleText: 'text-info',
            border: 'border-(--text-tertiary)/10'
        },
        warning: {
            headerBg: 'bg-warning/10',
            iconText: 'text-warning',
            titleText: 'text-(--text-primary)',
            subtitleText: 'text-warning',
            border: 'border-(--text-tertiary)/10'
        },
        success: {
            headerBg: 'bg-success/10',
            iconText: 'text-success',
            titleText: 'text-(--text-primary)',
            subtitleText: 'text-success',
            border: 'border-(--text-tertiary)/10'
        },
        error: {
            headerBg: 'bg-error/10',
            iconText: 'text-error',
            titleText: 'text-(--text-primary)',
            subtitleText: 'text-error',
            border: 'border-(--text-tertiary)/10'
        },
        accent: {
            headerBg: 'bg-accent/10',
            iconText: 'text-accent',
            titleText: 'text-(--text-primary)',
            subtitleText: 'text-accent',
            border: 'border-(--text-tertiary)/10'
        }
    };

    const styles = colorClasses[color] || colorClasses.info;

    return (
        <div className="bg-(--bg-primary) rounded-xl border border-(--text-tertiary)/20 overflow-hidden hover:shadow-xl transition-all group flex flex-col h-full">
            {/* Header */}
            <div className={`p-6 border-b ${styles.border} ${styles.headerBg} text-center flex flex-col items-center h-[140px] justify-center`}>
                <div className="flex flex-col items-center gap-2 mb-1">
                    {Icon && <Icon size={32} className={`${styles.iconText} mb-1`} />}
                    <h4 className={`font-bold text-lg leading-tight ${styles.titleText}`}>{title}</h4>
                </div>
                {subtitle && (
                    <span className={`text-xs font-bold uppercase tracking-wider ${styles.subtitleText}`}>
                        {subtitle}
                    </span>
                )}
            </div>

            {/* Body */}
            <div className="p-6 space-y-4 grow flex flex-col">
                {/* Description */}
                {(description) && (
                    <div className="text-(--text-primary) text-sm mb-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: description }} />
                )}

                <div className="mt-auto space-y-4">
                    {/* Ventajas */}
                    {pros && (
                        <div className="bg-success/5 p-3 rounded border border-success/20">
                            <h5 className="font-bold text-success text-xs flex items-center gap-2 mb-1">
                                <CheckCircle2 size={14} /> VENTAJAS
                            </h5>
                            <p className="text-xs text-(--text-secondary) leading-relaxed" dangerouslySetInnerHTML={{ __html: pros }} />
                        </div>
                    )}

                    {/* Desventajas */}
                    {cons && (
                        <div className="bg-error/5 p-3 rounded border border-error/20">
                            <h5 className="font-bold text-error text-xs flex items-center gap-2 mb-1">
                                <AlertTriangle size={14} /> DESVENTAJAS
                            </h5>
                            <p className="text-xs text-(--text-secondary) leading-relaxed" dangerouslySetInnerHTML={{ __html: cons }} />
                        </div>
                    )}
                </div>
            </div>

            {/* Footer Opcional */}
            {footer && (
                <div className={`p-4 border-t ${styles.border} bg-(--bg-primary)/50 mt-auto`}>
                    {footer}
                </div>
            )}
        </div>
    );
};

export default ComparisonCard;
