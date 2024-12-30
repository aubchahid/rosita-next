// components/table/utils.tsx
import dayjs from "dayjs";
import { Avatar, AvatarProps, Badge, cn, Text } from "rizzui";

interface AvatarCardProps {
  src?: string;
  name: string;
  className?: string;
  description?: string;
  avatarProps?: AvatarProps;
}

export function AvatarCard({ src, name, className, description, avatarProps }: AvatarCardProps) {
  return (
    <figure className={cn("flex items-center gap-3", className)}>
      <Avatar
        name={name}
        src={src}
        {...avatarProps}
      />
      <figcaption className="grid gap-0.5">
        <Text className="font-lexend text-sm font-medium text-gray-900 dark:text-gray-700">
          {name}
        </Text>
        {description && <Text className="text-[13px] text-gray-500">{description}</Text>}
      </figcaption>
    </figure>
  );
}

interface DateCellProps {
  date: Date;
  className?: string;
  dateFormat?: string;
  dateClassName?: string;
  timeFormat?: string;
  timeClassName?: string;
}

export function DateCell({
  date,
  className,
  timeClassName,
  dateClassName,
  dateFormat = "MMMM D, YYYY",
  timeFormat = "h:mm A",
}: DateCellProps) {
  return (
    <div className={cn("grid gap-1", className)}>
      <time
        dateTime={formatDate(date, "YYYY-MM-DD")}
        className={cn("font-medium text-gray-700", dateClassName)}
      >
        {formatDate(date, dateFormat)}
      </time>
      <time
        dateTime={formatDate(date, "HH:mm:ss")}
        className={cn("text-[13px] text-gray-500", timeClassName)}
      >
        {formatDate(date, timeFormat)}
      </time>
    </div>
  );
}

export function formatDate(date?: Date, format: string = "DD MMM, YYYY"): string {
  if (!date) return "";
  return dayjs(date).format(format);
}

interface StatusConfig {
  [key: string]: {
    color: 'success' | 'warning' | 'danger';
    textColor: string;
  }
}

const statusConfigs: StatusConfig = {
  pending: {
    color: 'warning',
    textColor: 'text-orange-dark',
  },
  paid: {
    color: 'success',
    textColor: 'text-green-dark',
  },
  overdue: {
    color: 'danger',
    textColor: 'text-red-dark',
  },
  active: {
    color: 'success',
    textColor: 'text-green-dark',
  },
  inactive: {
    color: 'warning',
    textColor: 'text-orange-dark',
  },
  delivered: {
    color: 'success',
    textColor: 'text-green-dark',
  },
  'in_transit': {
    color: 'warning',
    textColor: 'text-orange-dark',
  },
  cancelled: {
    color: 'danger',
    textColor: 'text-red-dark',
  }
};

export function getStatusBadge(status: string) {
  const config = statusConfigs[status.toLowerCase()] || {
    color: 'default',
    textColor: 'text-gray-600'
  };

  return (
    <div className="flex items-center">
      <Badge
        color={config.color}
        renderAsDot
        className={config.color === 'success' ? 'bg-gray-400' : ''}
      />
      <Text className={`ms-2 font-medium capitalize ${config.textColor}`}>
        {status}
      </Text>
    </div>
  );
}

export function renderOptionDisplayValue(value: string) {
  return getStatusBadge(value);
}