const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { InspectorControls } = wp.editor
const { SelectControl, CheckboxControl } = wp.components
const icon = () => (<i className='fas fa-link fa-2x' />)

// workaround to prevent the custom category from throwing an console warning
function setCategory () {
  if (window.location.href.indexOf('wp-admin') !== -1) {
    return 'idx-category'
  } else {
    return 'widgets'
  }
}

registerBlockType(
  'idx-broker-platinum/impress-city-links-block', {
    title: __('IMPress City Links', 'idx-broker-platinum'),
    icon: icon,
    category: setCategory(),
    attributes: {
      mls: {
        type: 'string',
        default: 'a000'
      },
      city_list: {
        type: 'string',
        default: 'combinedActiveMLS'
      },
      use_columns: {
        type: 'int',
        default: 1
      },
      number_columns: {
        type: 'int',
        default: 4
      },
      styles: {
        type: 'int',
        default: 1
      },
      show_count: {
        type: 'int',
        default: 0
      },
      new_window: {
        type: 'int',
        default: 0
      }
    },
    edit: ({ attributes, setAttributes }) => {
      const columnCountOptions = [{ label: '2', value: '2' }, { label: '3', value: '3' }, { label: '4', value: '4' }]

      return (
        <div>
          <div className='idx-block-placeholder-container'>
            <img src={impress_city_links_block_image_url} />
          </div>

          <InspectorControls>
            <SelectControl
              label={__('MLS to use for city links:', 'idx-broker-platinum')}
              value={attributes.mls}
              options={(impress_city_links_mls_options || [{ label: '-', value: '' }])}
              onChange={(value) => { setAttributes({ mls: value }) }}
            />
            <SelectControl
              label={__('Select a city list:', 'idx-broker-platinum')}
              value={attributes.city_list}
              options={(impress_city_links_city_options || [{ label: '-', value: '' }])}
              onChange={(value) => { setAttributes({ city_list: value }) }}
            />
            <CheckboxControl
              label={__('Split links into columns?', 'idx-broker-platinum')}
              value={attributes.use_columns}
              checked={(attributes.use_columns > 0)}
              onChange={(value) => { setAttributes({ use_columns: value }) }}
            />
            <SelectControl
              label={__('Number of columns:', 'idx-broker-platinum')}
              value={attributes.number_columns}
              options={columnCountOptions}
              onChange={(value) => { setAttributes({ number_columns: value }) }}
            />
            <CheckboxControl
              label={__('Default Styles?', 'idx-broker-platinum')}
              value={attributes.styles}
              checked={(attributes.styles > 0)}
              onChange={(value) => { setAttributes({ styles: (value > 0 ? 1 : 0) }) }}
            />
            <CheckboxControl
              label={__('Show Number of Listings for each city?', 'idx-broker-platinum')}
              value={attributes.show_count}
              checked={(attributes.show_count > 0)}
              onChange={(value) => { setAttributes({ show_count: (value > 0 ? 1 : 0) }) }}
            />
            <CheckboxControl
              label={__('Open Listings in a New Window?', 'idx-broker-platinum')}
              value={attributes.new_window}
              checked={(attributes.new_window > 0)}
              onChange={(value) => { setAttributes({ new_window: (value > 0 ? 1 : 0) }) }}
            />
            <p>
              Don't have any city lists? Go create some in your
              <a href='http://middleware.idxbroker.com/mgmt/citycountyziplists.php' target='_blank'>
                IDX dashboard.
              </a>
            </p>
          </InspectorControls>
        </div>
      )
    },
    save: () => {
      return null
    }
  }
)
