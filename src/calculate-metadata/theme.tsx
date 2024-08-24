import React from 'react';
import {z} from 'zod';
import type {getThemeColors} from '@code-hike/lighter';

export type ThemeColors = Awaited<ReturnType<typeof getThemeColors>>;

export const themeSchema = z.enum(['latte', 'frappe', 'macchiato', 'mocha']);

export type Theme = z.infer<typeof themeSchema>;

export const ThemeColorsContext = React.createContext<ThemeColors | null>(null);

export const useThemeColors = () => {
	const themeColors = React.useContext(ThemeColorsContext);
	if (!themeColors) {
		throw new Error('ThemeColorsContext not found');
	}

	return themeColors;
};

export const ThemeProvider = ({
	children,
	themeColors,
}: {
	children: React.ReactNode;
	themeColors: ThemeColors;
}) => {
	return (
		<ThemeColorsContext.Provider value={themeColors}>
			{children}
		</ThemeColorsContext.Provider>
	);
};
