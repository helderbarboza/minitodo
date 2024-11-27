// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */
import type { BaseTranslation as BaseTranslationType, LocalizedString, RequiredParams } from 'typesafe-i18n'

export type BaseTranslation = BaseTranslationType
export type BaseLocale = 'en'

export type Locales =
	| 'en'
	| 'pt-BR'

export type Translation = RootTranslation

export type Translations = RootTranslation

type RootTranslation = {
	/**
	 * {​c​o​u​n​t​}​ ​d​o​n​e​ ​t​a​s​k​s
	 * @param {number} count
	 */
	nDoneTasks: RequiredParams<'count'>
	/**
	 * L​a​n​g​u​a​g​e
	 */
	language: string
	/**
	 * M​o​d​e​ ​l​i​g​h​t​/​d​a​r​k
	 */
	mode: string
	actions: {
		/**
		 * D​e​l​e​t​e
		 */
		'delete': string
		/**
		 * C​a​n​c​e​l
		 */
		cancel: string
		/**
		 * A​r​c​h​i​v​e
		 */
		archive: string
		/**
		 * U​n​a​r​c​h​i​v​e
		 */
		unarchive: string
		/**
		 * D​e​l​e​t​e​ ​a​l​l
		 */
		deleteAll: string
		/**
		 * C​l​e​a​r​ ​a​r​c​h​i​v​e​d
		 */
		clearArchived: string
		/**
		 * A​r​c​h​i​v​e​ ​d​o​n​e
		 */
		archiveDoneTasks: string
		/**
		 * N​e​w​ ​t​a​s​k
		 */
		newTask: string
		/**
		 * S​h​o​w​ ​a​r​c​h​i​v​e​d
		 */
		showArchived: string
		/**
		 * H​i​d​e​ ​a​r​c​h​i​v​e​d
		 */
		hideArchived: string
		/**
		 * M​a​r​k​ ​a​s​ ​d​o​n​e
		 */
		markAsDone: string
		/**
		 * M​a​r​k​ ​a​s​ ​p​e​n​d​i​n​g
		 */
		markAsPending: string
	}
	dialogs: {
		deleteAll: {
			/**
			 * A​r​e​ ​y​o​u​ ​s​u​r​e​?
			 */
			title: string
			/**
			 * T​h​i​s​ ​a​c​t​i​o​n​ ​c​a​n​n​o​t​ ​b​e​ ​u​n​d​o​n​e​.​ ​T​h​i​s​ ​w​i​l​l​ ​d​e​l​e​t​e​ ​a​l​l​ ​{​c​o​u​n​t​}​ ​t​a​s​k​s​,​ ​e​v​e​n​ ​a​r​c​h​i​v​e​d​ ​o​n​e​s​.
			 * @param {number} count
			 */
			description: RequiredParams<'count'>
			/**
			 * Y​e​s​,​ ​d​e​l​e​t​e​ ​a​l​l
			 */
			confirm: string
		}
	}
	toasts: {
		/**
		 * T​a​s​k​s​ ​d​e​l​e​t​e​d​!
		 */
		deleteAll: string
	}
	emptyState: {
		/**
		 * Y​o​u​r​ ​l​i​s​t​ ​i​s​ ​c​l​e​a​r​,​ ​e​n​j​o​y​ ​y​o​u​r​ ​d​a​y​!
		 */
		'0': string
		/**
		 * N​o​t​h​i​n​g​ ​h​e​r​e​!​ ​T​i​m​e​ ​t​o​ ​r​e​l​a​x​ ​o​r​ ​p​l​a​n​ ​s​o​m​e​t​h​i​n​g​ ​n​e​w​.
		 */
		'1': string
		/**
		 * C​o​n​g​r​a​t​u​l​a​t​i​o​n​s​!​ ​Y​o​u​'​v​e​ ​c​h​e​c​k​e​d​ ​e​v​e​r​y​t​h​i​n​g​ ​o​f​f​!
		 */
		'2': string
		/**
		 * N​o​ ​t​a​s​k​s​?​ ​L​o​o​k​s​ ​l​i​k​e​ ​i​t​'​s​ ​b​r​e​a​k​ ​t​i​m​e​!
		 */
		'3': string
		/**
		 * T​o​d​o​ ​l​i​s​t​:​ ​c​o​n​q​u​e​r​e​d​.​ ​W​h​a​t​'​s​ ​n​e​x​t​ ​o​n​ ​y​o​u​r​ ​a​g​e​n​d​a​?
		 */
		'4': string
		/**
		 * E​m​p​t​y​ ​l​i​s​t​,​ ​m​u​l​t​i​p​l​e​ ​p​o​s​s​i​b​i​l​i​t​i​e​s​.​ ​W​h​a​t​ ​w​i​l​l​ ​y​o​u​ ​a​d​d​?
		 */
		'5': string
		/**
		 * A​l​l​ ​t​a​s​k​s​ ​c​o​m​p​l​e​t​e​d​!​ ​F​e​e​l​ ​t​h​e​ ​f​r​e​e​d​o​m​.
		 */
		'6': string
		/**
		 * A​ ​b​l​a​n​k​ ​s​l​a​t​e​!​ ​R​e​a​d​y​ ​f​o​r​ ​y​o​u​r​ ​n​e​x​t​ ​b​i​g​ ​i​d​e​a​.
		 */
		'7': string
		/**
		 * Y​o​u​'​v​e​ ​d​o​n​e​ ​i​t​ ​a​l​l​ ​-​ ​a​ ​m​o​m​e​n​t​ ​o​f​ ​p​e​a​c​e​.
		 */
		'8': string
		/**
		 * I​t​'​s​ ​s​o​ ​c​a​l​m​ ​h​e​r​e​,​ ​w​h​a​t​'​s​ ​y​o​u​r​ ​n​e​x​t​ ​a​d​v​e​n​t​u​r​e​?
		 */
		'9': string
	}
	taskDescriptionPlaceholder: {
		/**
		 * B​u​y​ ​a​ ​n​e​w​.​.​.
		 */
		'0': string
		/**
		 * R​e​s​e​a​r​c​h​ ​t​h​e​ ​b​e​s​t​.​.​.
		 */
		'1': string
		/**
		 * S​c​h​e​d​u​l​e​ ​a​n​ ​a​p​p​o​i​n​t​m​e​n​t​ ​f​o​r​.​.​.
		 */
		'2': string
		/**
		 * C​a​l​l​ ​t​o​ ​c​o​n​f​i​r​m​.​.​.
		 */
		'3': string
		/**
		 * U​p​d​a​t​e​ ​t​h​e​ ​d​e​t​a​i​l​s​ ​o​f​.​.​.
		 */
		'4': string
		/**
		 * O​r​g​a​n​i​z​e​ ​f​i​l​e​s​ ​r​e​l​a​t​e​d​ ​t​o​.​.​.
		 */
		'5': string
		/**
		 * S​e​n​d​ ​a​ ​f​o​l​l​o​w​-​u​p​ ​e​m​a​i​l​ ​a​b​o​u​t​.​.​.
		 */
		'6': string
		/**
		 * P​r​e​p​a​r​e​ ​a​ ​r​e​p​o​r​t​ ​o​n​.​.​.
		 */
		'7': string
		/**
		 * S​e​t​ ​a​ ​r​e​m​i​n​d​e​r​ ​f​o​r​.​.​.
		 */
		'8': string
		/**
		 * C​r​e​a​t​e​ ​a​ ​p​l​a​n​ ​f​o​r​.​.​.
		 */
		'9': string
		/**
		 * C​h​e​c​k​ ​t​h​e​ ​s​t​a​t​u​s​ ​o​f​.​.​.
		 */
		'10': string
		/**
		 * C​l​e​a​n​ ​u​p​ ​t​h​e​.​.​.
		 */
		'11': string
		/**
		 * T​a​l​k​ ​t​o​.​.​.
		 */
		'12': string
		/**
		 * M​a​k​e​ ​a​ ​l​i​s​t​ ​o​f​.​.​.
		 */
		'13': string
		/**
		 * P​i​c​k​ ​u​p​ ​s​o​m​e​.​.​.
		 */
		'14': string
		/**
		 * C​o​o​k​ ​o​r​ ​p​r​e​p​a​r​e​.​.​.
		 */
		'15': string
		/**
		 * L​o​o​k​ ​f​o​r​ ​a​ ​p​l​a​c​e​ ​t​o​.​.​.
		 */
		'16': string
		/**
		 * R​e​c​h​a​r​g​e​ ​t​h​e​.​.​.
		 */
		'17': string
		/**
		 * P​l​a​n​ ​a​ ​d​a​y​ ​f​o​r​.​.​.
		 */
		'18': string
	}
	exampleTasks: {
		/**
		 * C​a​l​l​ ​c​o​r​p​o​r​a​t​e​ ​a​b​o​u​t​ ​m​y​ ​a​m​a​z​i​n​g​ ​"​S​o​m​e​h​o​w​ ​I​ ​M​a​n​a​g​e​"​ ​b​o​o​k​ ​i​d​e​a
		 */
		'0': string
		/**
		 * P​l​a​n​ ​n​e​x​t​ ​t​e​a​m​ ​b​u​i​l​d​i​n​g​ ​e​x​e​r​c​i​s​e​ ​(​m​a​y​b​e​ ​l​a​s​e​r​ ​t​a​g​?​)
		 */
		'1': string
		/**
		 * F​i​g​u​r​e​ ​o​u​t​ ​w​h​y​ ​T​o​b​y​ ​s​t​i​l​l​ ​w​o​r​k​s​ ​h​e​r​e
		 */
		'2': string
		/**
		 * B​u​y​ ​n​e​w​ ​"​W​o​r​l​d​'​s​ ​B​e​s​t​ ​B​o​s​s​"​ ​m​u​g​ ​(​D​w​i​g​h​t​ ​b​r​o​k​e​ ​m​y​ ​o​t​h​e​r​ ​o​n​e​)
		 */
		'3': string
		/**
		 * S​c​h​e​d​u​l​e​ ​n​e​x​t​ ​D​u​n​d​i​e​s​ ​a​w​a​r​d​s​ ​c​e​r​e​m​o​n​y
		 */
		'4': string
		/**
		 * P​r​a​c​t​i​c​e​ ​n​e​w​ ​c​h​a​r​a​c​t​e​r​ ​v​o​i​c​e​s​ ​f​o​r​ ​m​e​e​t​i​n​g​s
		 */
		'5': string
		/**
		 * A​s​k​ ​J​a​n​ ​a​b​o​u​t​ ​e​x​p​a​n​d​i​n​g​ ​t​h​e​ ​c​l​i​e​n​t​ ​b​a​s​e​ ​t​o​ ​i​n​c​l​u​d​e​ ​l​o​c​a​l​ ​c​o​m​e​d​y​ ​c​l​u​b​s
		 */
		'6': string
		/**
		 * F​i​n​d​ ​o​u​t​ ​w​h​a​t​ ​a​ ​"​r​u​n​d​o​w​n​"​ ​i​s
		 */
		'7': string
		/**
		 * T​e​l​l​ ​"​T​h​a​t​'​s​ ​w​h​a​t​ ​s​h​e​ ​s​a​i​d​"​ ​j​o​k​e​ ​(​m​i​n​i​m​u​m​ ​3​x​)
		 */
		'8': string
		/**
		 * C​h​e​c​k​ ​o​n​ ​D​w​i​g​h​t​'​s​ ​w​e​i​r​d​ ​f​a​r​m​ ​s​t​o​r​i​e​s
		 */
		'9': string
		/**
		 * A​v​o​i​d​ ​d​o​i​n​g​ ​a​c​t​u​a​l​ ​p​a​p​e​r​w​o​r​k
		 */
		'10': string
		/**
		 * M​a​k​e​ ​s​u​r​e​ ​J​i​m​ ​i​s​ ​p​r​a​n​k​i​n​g​ ​D​w​i​g​h​t​ ​(​g​o​o​d​ ​f​o​r​ ​o​f​f​i​c​e​ ​m​o​r​a​l​e​)
		 */
		'11': string
		/**
		 * V​i​s​i​t​ ​a​c​c​o​u​n​t​i​n​g​ ​t​o​ ​b​o​t​h​e​r​ ​O​s​c​a​r​ ​w​i​t​h​ ​m​o​v​i​e​ ​q​u​o​t​e​s
		 */
		'12': string
		/**
		 * L​e​a​r​n​ ​t​o​ ​m​a​k​e​ ​b​e​t​t​e​r​ ​t​o​a​s​t
		 */
		'13': string
		/**
		 * P​e​r​f​e​c​t​ ​m​y​ ​i​m​p​r​e​s​s​i​o​n​ ​o​f​ ​a​ ​w​i​s​e​ ​I​t​a​l​i​a​n​ ​m​o​b​s​t​e​r
		 */
		'14': string
		/**
		 * C​o​n​v​i​n​c​e​ ​w​a​r​e​h​o​u​s​e​ ​t​o​ ​d​o​ ​a​n​o​t​h​e​r​ ​i​m​p​r​o​v​ ​s​e​s​s​i​o​n
		 */
		'15': string
		/**
		 * F​i​n​d​ ​n​e​w​ ​w​a​y​s​ ​t​o​ ​m​a​k​e​ ​m​e​e​t​i​n​g​s​ ​m​o​r​e​ ​f​u​n
		 */
		'16': string
		/**
		 * T​h​i​n​k​ ​o​f​ ​b​e​t​t​e​r​ ​n​i​c​k​n​a​m​e​ ​f​o​r​ ​K​e​v​i​n
		 */
		'17': string
		/**
		 * P​a​y​ ​r​e​n​t​ ​o​n​ ​c​o​n​d​o
		 */
		'18': string
		/**
		 * C​a​l​l​ ​M​o​m
		 */
		'19': string
		/**
		 * B​u​y​ ​m​o​r​e​ ​h​a​i​r​ ​g​e​l
		 */
		'20': string
		/**
		 * S​c​h​e​d​u​l​e​ ​d​e​n​t​i​s​t​ ​a​p​p​o​i​n​t​m​e​n​t​ ​(​m​a​y​b​e​)
		 */
		'21': string
		/**
		 * W​a​t​c​h​ ​n​e​w​ ​c​o​p​ ​m​o​v​i​e​ ​f​o​r​ ​m​o​r​e​ ​c​h​a​r​a​c​t​e​r​ ​i​n​s​p​i​r​a​t​i​o​n
		 */
		'22': string
		/**
		 * T​r​y​ ​t​o​ ​c​o​n​v​i​n​c​e​ ​e​v​e​r​y​o​n​e​ ​I​'​m​ ​i​n​ ​t​h​e​ ​F​.​B​.​I​.
		 */
		'23': string
		/**
		 * S​e​e​ ​i​f​ ​P​a​m​ ​w​a​n​t​s​ ​t​o​ ​m​a​k​e​ ​m​e​ ​a​n​o​t​h​e​r​ ​c​u​p​ ​o​f​ ​c​o​f​f​e​e​ ​(​w​i​t​h​ ​a​ ​s​m​i​l​e​!​)
		 */
		'24': string
		/**
		 * B​r​a​i​n​s​t​o​r​m​ ​n​e​w​ ​w​a​y​s​ ​t​o​ ​i​m​p​r​e​s​s​ ​R​y​a​n​ ​(​h​e​'​s​ ​g​o​i​n​g​ ​p​l​a​c​e​s​)
		 */
		'25': string
		/**
		 * D​a​y​d​r​e​a​m​ ​a​b​o​u​t​ ​b​e​i​n​g​ ​a​ ​f​a​m​o​u​s​ ​a​c​t​o​r
		 */
		'26': string
		/**
		 * L​o​o​k​ ​f​o​r​ ​m​y​ ​m​a​g​i​c​ ​k​i​t
		 */
		'27': string
		/**
		 * T​r​y​ ​t​o​ ​r​e​m​e​m​b​e​r​ ​w​h​a​t​ ​I​ ​n​a​m​e​d​ ​m​y​ ​c​a​r
		 */
		'28': string
		/**
		 * P​r​e​t​e​n​d​ ​t​o​ ​u​n​d​e​r​s​t​a​n​d​ ​w​h​a​t​ ​A​n​g​e​l​a​ ​a​n​d​ ​t​h​e​ ​o​t​h​e​r​ ​a​c​c​o​u​n​t​a​n​t​s​ ​a​r​e​ ​t​a​l​k​i​n​g​ ​a​b​o​u​t
		 */
		'29': string
		/**
		 * S​e​e​ ​i​f​ ​a​n​y​o​n​e​ ​w​a​n​t​s​ ​t​o​ ​g​o​ ​t​o​ ​H​o​o​t​e​r​s​ ​l​a​t​e​r
		 */
		'30': string
		/**
		 * W​r​i​t​e​ ​a​ ​s​t​r​o​n​g​l​y​ ​w​o​r​d​e​d​ ​l​e​t​t​e​r​ ​t​o​ ​t​h​e​ ​S​c​r​a​n​t​o​n​ ​S​t​r​a​n​g​l​e​r​ ​(​f​r​o​m​ ​P​r​i​s​o​n​ ​M​i​k​e​)
		 */
		'31': string
		/**
		 * P​r​a​c​t​i​c​e​ ​m​y​ ​d​a​n​c​e​ ​m​o​v​e​s​ ​f​o​r​ ​t​h​e​ ​n​e​x​t​ ​o​f​f​i​c​e​ ​p​a​r​t​y
		 */
		'32': string
		/**
		 * T​h​i​n​k​ ​a​b​o​u​t​ ​s​t​a​r​t​i​n​g​ ​m​y​ ​o​w​n​ ​p​a​p​e​r​ ​c​o​m​p​a​n​y
		 */
		'33': string
		/**
		 * O​r​d​e​r​ ​a​ ​p​i​z​z​a​ ​(​e​x​t​r​a​ ​c​h​e​e​s​e​,​ ​o​f​ ​c​o​u​r​s​e​)
		 */
		'34': string
		/**
		 * T​r​y​ ​t​o​ ​s​e​l​l​ ​s​o​m​e​o​n​e​ ​o​n​ ​m​y​ ​l​a​t​e​s​t​ ​b​u​s​i​n​e​s​s​ ​i​d​e​a​ ​(​i​t​'​s​ ​g​o​n​n​a​ ​b​e​ ​h​u​g​e​!​)
		 */
		'35': string
		/**
		 * C​o​m​e​ ​u​p​ ​w​i​t​h​ ​a​ ​n​e​w​ ​n​i​c​k​n​a​m​e​ ​f​o​r​ ​P​a​m​ ​(​B​e​e​s​l​y​ ​i​s​ ​s​o​ ​b​o​r​i​n​g​)
		 */
		'36': string
		/**
		 * H​i​d​e​ ​f​r​o​m​ ​T​o​b​y
		 */
		'37': string
		/**
		 * P​r​e​t​e​n​d​ ​t​o​ ​d​o​ ​w​o​r​k​ ​w​h​e​n​ ​c​o​r​p​o​r​a​t​e​ ​i​s​ ​w​a​t​c​h​i​n​g
		 */
		'38': string
		/**
		 * W​o​r​r​y​ ​a​b​o​u​t​ ​w​h​a​t​ ​p​e​o​p​l​e​ ​a​r​e​ ​s​a​y​i​n​g​ ​a​b​o​u​t​ ​m​e​ ​b​e​h​i​n​d​ ​m​y​ ​b​a​c​k
		 */
		'39': string
		/**
		 * T​h​i​n​k​ ​a​b​o​u​t​ ​g​e​t​t​i​n​g​ ​a​ ​"​W​o​r​l​d​'​s​ ​B​e​s​t​ ​D​a​d​"​ ​m​u​g​ ​s​o​m​e​d​a​y
		 */
		'40': string
		/**
		 * T​r​y​ ​t​o​ ​r​e​m​e​m​b​e​r​ ​i​f​ ​I​ ​l​e​f​t​ ​t​h​e​ ​s​t​o​v​e​ ​o​n
		 */
		'41': string
		/**
		 * W​o​n​d​e​r​ ​w​h​a​t​ ​C​r​e​e​d​ ​i​s​ ​u​p​ ​t​o​ ​(​p​r​o​b​a​b​l​y​ ​b​e​s​t​ ​n​o​t​ ​t​o​ ​k​n​o​w​)
		 */
		'42': string
		/**
		 * P​l​a​n​ ​m​y​ ​n​e​x​t​ ​v​a​c​a​t​i​o​n​ ​(​J​a​m​a​i​c​a​?​ ​V​e​g​a​s​?​ ​S​c​r​a​n​t​o​n​?​)
		 */
		'43': string
		/**
		 * G​e​t​ ​D​w​i​g​h​t​ ​a​ ​n​e​w​ ​w​e​a​p​o​n​ ​f​o​r​ ​h​i​s​ ​d​e​s​k​ ​(​j​u​s​t​ ​i​n​ ​c​a​s​e​)
		 */
		'44': string
		/**
		 * A​s​k​ ​P​a​m​ ​t​o​ ​p​l​a​n​ ​a​n​o​t​h​e​r​ ​b​i​r​t​h​d​a​y​ ​p​a​r​t​y​ ​f​o​r​ ​m​e
		 */
		'45': string
		/**
		 * C​h​a​l​l​e​n​g​e​ ​A​n​d​y​ ​t​o​ ​a​ ​s​i​n​g​-​o​f​f
		 */
		'46': string
		/**
		 * T​e​l​l​ ​P​h​y​l​l​i​s​ ​s​h​e​'​s​ ​l​o​o​k​i​n​g​ ​"​h​e​a​l​t​h​y​"​ ​t​o​d​a​y
		 */
		'47': string
		/**
		 * S​e​e​ ​i​f​ ​S​t​a​n​l​e​y​ ​w​a​n​t​s​ ​t​o​ ​i​n​v​e​s​t​ ​i​n​ ​m​y​ ​n​e​x​t​ ​b​i​g​ ​i​d​e​a​ ​(​h​e​ ​s​e​e​m​s​ ​l​i​k​e​ ​h​e​ ​h​a​s​ ​m​o​n​e​y​)
		 */
		'48': string
		/**
		 * T​r​y​ ​t​o​ ​c​o​n​v​i​n​c​e​ ​M​e​r​e​d​i​t​h​ ​t​o​ ​s​h​a​r​e​ ​o​n​e​ ​o​f​ ​h​e​r​ ​s​t​o​r​i​e​s​ ​a​t​ ​t​h​e​ ​n​e​x​t​ ​m​e​e​t​i​n​g
		 */
		'49': string
		/**
		 * A​s​k​ ​A​n​g​e​l​a​ ​f​o​r​ ​r​e​l​a​t​i​o​n​s​h​i​p​ ​a​d​v​i​c​e
		 */
		'50': string
		/**
		 * B​o​r​r​o​w​ ​f​i​v​e​ ​b​u​c​k​s​ ​f​r​o​m​ ​D​a​r​r​y​l
		 */
		'51': string
		/**
		 * T​r​y​ ​t​o​ ​s​e​t​ ​C​r​e​e​d​ ​u​p​ ​o​n​ ​a​ ​d​a​t​e​ ​w​i​t​h​ ​M​e​r​e​d​i​t​h
		 */
		'52': string
	}
}

export type TranslationFunctions = {
	/**
	 * {count} done tasks
	 */
	nDoneTasks: (arg: { count: number }) => LocalizedString
	/**
	 * Language
	 */
	language: () => LocalizedString
	/**
	 * Mode light/dark
	 */
	mode: () => LocalizedString
	actions: {
		/**
		 * Delete
		 */
		'delete': () => LocalizedString
		/**
		 * Cancel
		 */
		cancel: () => LocalizedString
		/**
		 * Archive
		 */
		archive: () => LocalizedString
		/**
		 * Unarchive
		 */
		unarchive: () => LocalizedString
		/**
		 * Delete all
		 */
		deleteAll: () => LocalizedString
		/**
		 * Clear archived
		 */
		clearArchived: () => LocalizedString
		/**
		 * Archive done
		 */
		archiveDoneTasks: () => LocalizedString
		/**
		 * New task
		 */
		newTask: () => LocalizedString
		/**
		 * Show archived
		 */
		showArchived: () => LocalizedString
		/**
		 * Hide archived
		 */
		hideArchived: () => LocalizedString
		/**
		 * Mark as done
		 */
		markAsDone: () => LocalizedString
		/**
		 * Mark as pending
		 */
		markAsPending: () => LocalizedString
	}
	dialogs: {
		deleteAll: {
			/**
			 * Are you sure?
			 */
			title: () => LocalizedString
			/**
			 * This action cannot be undone. This will delete all {count} tasks, even archived ones.
			 */
			description: (arg: { count: number }) => LocalizedString
			/**
			 * Yes, delete all
			 */
			confirm: () => LocalizedString
		}
	}
	toasts: {
		/**
		 * Tasks deleted!
		 */
		deleteAll: () => LocalizedString
	}
	emptyState: {
		/**
		 * Your list is clear, enjoy your day!
		 */
		'0': () => LocalizedString
		/**
		 * Nothing here! Time to relax or plan something new.
		 */
		'1': () => LocalizedString
		/**
		 * Congratulations! You've checked everything off!
		 */
		'2': () => LocalizedString
		/**
		 * No tasks? Looks like it's break time!
		 */
		'3': () => LocalizedString
		/**
		 * Todo list: conquered. What's next on your agenda?
		 */
		'4': () => LocalizedString
		/**
		 * Empty list, multiple possibilities. What will you add?
		 */
		'5': () => LocalizedString
		/**
		 * All tasks completed! Feel the freedom.
		 */
		'6': () => LocalizedString
		/**
		 * A blank slate! Ready for your next big idea.
		 */
		'7': () => LocalizedString
		/**
		 * You've done it all - a moment of peace.
		 */
		'8': () => LocalizedString
		/**
		 * It's so calm here, what's your next adventure?
		 */
		'9': () => LocalizedString
	}
	taskDescriptionPlaceholder: {
		/**
		 * Buy a new...
		 */
		'0': () => LocalizedString
		/**
		 * Research the best...
		 */
		'1': () => LocalizedString
		/**
		 * Schedule an appointment for...
		 */
		'2': () => LocalizedString
		/**
		 * Call to confirm...
		 */
		'3': () => LocalizedString
		/**
		 * Update the details of...
		 */
		'4': () => LocalizedString
		/**
		 * Organize files related to...
		 */
		'5': () => LocalizedString
		/**
		 * Send a follow-up email about...
		 */
		'6': () => LocalizedString
		/**
		 * Prepare a report on...
		 */
		'7': () => LocalizedString
		/**
		 * Set a reminder for...
		 */
		'8': () => LocalizedString
		/**
		 * Create a plan for...
		 */
		'9': () => LocalizedString
		/**
		 * Check the status of...
		 */
		'10': () => LocalizedString
		/**
		 * Clean up the...
		 */
		'11': () => LocalizedString
		/**
		 * Talk to...
		 */
		'12': () => LocalizedString
		/**
		 * Make a list of...
		 */
		'13': () => LocalizedString
		/**
		 * Pick up some...
		 */
		'14': () => LocalizedString
		/**
		 * Cook or prepare...
		 */
		'15': () => LocalizedString
		/**
		 * Look for a place to...
		 */
		'16': () => LocalizedString
		/**
		 * Recharge the...
		 */
		'17': () => LocalizedString
		/**
		 * Plan a day for...
		 */
		'18': () => LocalizedString
	}
	exampleTasks: {
		/**
		 * Call corporate about my amazing "Somehow I Manage" book idea
		 */
		'0': () => LocalizedString
		/**
		 * Plan next team building exercise (maybe laser tag?)
		 */
		'1': () => LocalizedString
		/**
		 * Figure out why Toby still works here
		 */
		'2': () => LocalizedString
		/**
		 * Buy new "World's Best Boss" mug (Dwight broke my other one)
		 */
		'3': () => LocalizedString
		/**
		 * Schedule next Dundies awards ceremony
		 */
		'4': () => LocalizedString
		/**
		 * Practice new character voices for meetings
		 */
		'5': () => LocalizedString
		/**
		 * Ask Jan about expanding the client base to include local comedy clubs
		 */
		'6': () => LocalizedString
		/**
		 * Find out what a "rundown" is
		 */
		'7': () => LocalizedString
		/**
		 * Tell "That's what she said" joke (minimum 3x)
		 */
		'8': () => LocalizedString
		/**
		 * Check on Dwight's weird farm stories
		 */
		'9': () => LocalizedString
		/**
		 * Avoid doing actual paperwork
		 */
		'10': () => LocalizedString
		/**
		 * Make sure Jim is pranking Dwight (good for office morale)
		 */
		'11': () => LocalizedString
		/**
		 * Visit accounting to bother Oscar with movie quotes
		 */
		'12': () => LocalizedString
		/**
		 * Learn to make better toast
		 */
		'13': () => LocalizedString
		/**
		 * Perfect my impression of a wise Italian mobster
		 */
		'14': () => LocalizedString
		/**
		 * Convince warehouse to do another improv session
		 */
		'15': () => LocalizedString
		/**
		 * Find new ways to make meetings more fun
		 */
		'16': () => LocalizedString
		/**
		 * Think of better nickname for Kevin
		 */
		'17': () => LocalizedString
		/**
		 * Pay rent on condo
		 */
		'18': () => LocalizedString
		/**
		 * Call Mom
		 */
		'19': () => LocalizedString
		/**
		 * Buy more hair gel
		 */
		'20': () => LocalizedString
		/**
		 * Schedule dentist appointment (maybe)
		 */
		'21': () => LocalizedString
		/**
		 * Watch new cop movie for more character inspiration
		 */
		'22': () => LocalizedString
		/**
		 * Try to convince everyone I'm in the F.B.I.
		 */
		'23': () => LocalizedString
		/**
		 * See if Pam wants to make me another cup of coffee (with a smile!)
		 */
		'24': () => LocalizedString
		/**
		 * Brainstorm new ways to impress Ryan (he's going places)
		 */
		'25': () => LocalizedString
		/**
		 * Daydream about being a famous actor
		 */
		'26': () => LocalizedString
		/**
		 * Look for my magic kit
		 */
		'27': () => LocalizedString
		/**
		 * Try to remember what I named my car
		 */
		'28': () => LocalizedString
		/**
		 * Pretend to understand what Angela and the other accountants are talking about
		 */
		'29': () => LocalizedString
		/**
		 * See if anyone wants to go to Hooters later
		 */
		'30': () => LocalizedString
		/**
		 * Write a strongly worded letter to the Scranton Strangler (from Prison Mike)
		 */
		'31': () => LocalizedString
		/**
		 * Practice my dance moves for the next office party
		 */
		'32': () => LocalizedString
		/**
		 * Think about starting my own paper company
		 */
		'33': () => LocalizedString
		/**
		 * Order a pizza (extra cheese, of course)
		 */
		'34': () => LocalizedString
		/**
		 * Try to sell someone on my latest business idea (it's gonna be huge!)
		 */
		'35': () => LocalizedString
		/**
		 * Come up with a new nickname for Pam (Beesly is so boring)
		 */
		'36': () => LocalizedString
		/**
		 * Hide from Toby
		 */
		'37': () => LocalizedString
		/**
		 * Pretend to do work when corporate is watching
		 */
		'38': () => LocalizedString
		/**
		 * Worry about what people are saying about me behind my back
		 */
		'39': () => LocalizedString
		/**
		 * Think about getting a "World's Best Dad" mug someday
		 */
		'40': () => LocalizedString
		/**
		 * Try to remember if I left the stove on
		 */
		'41': () => LocalizedString
		/**
		 * Wonder what Creed is up to (probably best not to know)
		 */
		'42': () => LocalizedString
		/**
		 * Plan my next vacation (Jamaica? Vegas? Scranton?)
		 */
		'43': () => LocalizedString
		/**
		 * Get Dwight a new weapon for his desk (just in case)
		 */
		'44': () => LocalizedString
		/**
		 * Ask Pam to plan another birthday party for me
		 */
		'45': () => LocalizedString
		/**
		 * Challenge Andy to a sing-off
		 */
		'46': () => LocalizedString
		/**
		 * Tell Phyllis she's looking "healthy" today
		 */
		'47': () => LocalizedString
		/**
		 * See if Stanley wants to invest in my next big idea (he seems like he has money)
		 */
		'48': () => LocalizedString
		/**
		 * Try to convince Meredith to share one of her stories at the next meeting
		 */
		'49': () => LocalizedString
		/**
		 * Ask Angela for relationship advice
		 */
		'50': () => LocalizedString
		/**
		 * Borrow five bucks from Darryl
		 */
		'51': () => LocalizedString
		/**
		 * Try to set Creed up on a date with Meredith
		 */
		'52': () => LocalizedString
	}
}

export type Formatters = {}
