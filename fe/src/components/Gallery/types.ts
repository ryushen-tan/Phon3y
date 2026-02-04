export interface GalleryCardProps {
    title: string;
    date: string;
    description: string;
    onClick?: () => void;
    onDelete?: (e?: React.MouseEvent) => void;
    isSelected?: boolean;
}