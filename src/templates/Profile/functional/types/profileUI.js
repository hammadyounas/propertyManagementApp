/**
 * @typedef {Object} ProfileUser
 * @property {string} [_id]
 * @property {string} [name]
 * @property {string} [email]
 * @property {string} [role]
 * @property {string} [avatar]
 * @property {string} [contact_number]
 * @property {string} [address]
 * @property {string} [licence_number]
 * @property {string} [licence_type]
 * @property {string} [joining_date]
 * @property {string} [status]
 */

/**
 * @typedef {Object} ProfileSelectOption
 * @property {string} label
 * @property {string} value
 */

/**
 * Props for the Profile settings / edit UI organism.
 *
 * @typedef {Object} ProfileUIProps
 * @property {boolean} loading
 * @property {function} handleSubmit
 * @property {function} onSubmit
 * @property {function} register
 * @property {Object} errors
 * @property {ProfileSelectOption | null | undefined} status
 * @property {unknown[]} propertiesAssigned
 * @property {ProfileUser | null | undefined} user
 * @property {boolean} isEditing
 * @property {function(boolean): void} setIsEditing
 * @property {function} handleFileChange
 * @property {boolean} loadingAvatar
 * @property {function} handleCancel
 */

export {};
