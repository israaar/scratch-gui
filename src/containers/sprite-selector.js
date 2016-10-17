const bindAll = require('lodash.bindall');
const React = require('react');

const SpriteSelectorComponent = require('../components/sprite-selector');

class SpriteSelector extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, ['onChange', 'targetsUpdate']);
        this.state = {
            targets: {
                targetList: []
            }
        };
    }
    componentDidMount () {
        this.props.vm.on('targetsUpdate', this.targetsUpdate);
    }
    onChange (event) {
        this.props.vm.setEditingTarget(event.target.value);
    }
    targetsUpdate (data) {
        this.setState({targets: data});
    }
    render () {
        return (
            <SpriteSelectorComponent
                value={[this.state.targets.editingTarget]}
                onChange={this.onChange}
                sprites={this.state.targets.targetList.map(target => (
                    {
                        id: target[0],
                        name: target[1]
                    }
                ))}
            />
        );
    }
}

SpriteSelector.propTypes = {
    vm: React.PropTypes.object.isRequired
};

module.exports = SpriteSelector;