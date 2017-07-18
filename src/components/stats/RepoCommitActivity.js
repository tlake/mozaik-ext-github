import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RepoCommitActivityHistogramChart from './charts/RepoCommitActivityHistogramChart'
import RepoCommitActivityLineChart from './charts/RepoCommitActivityLineChart'
import {
    TrapApiError,
    Widget,
    WidgetHeader,
    WidgetBody,
    WidgetLoader,
} from '@mozaik/ui'

export default class RepositoryCommitActivity extends Component {
    static propTypes = {
        repository: PropTypes.string.isRequired,
        title: PropTypes.string,
        apiData: PropTypes.shape({
            buckets: PropTypes.arrayOf(PropTypes.object).isRequired,
        }),
        apiError: PropTypes.object,
        type: PropTypes.oneOf(['histogram', 'line']).isRequired,
    }

    static getApiRequest({ repository }) {
        return {
            id: `github.repoCommitActivity.${repository}`,
            params: { repository },
        }
    }

    render() {
        const { repository, title, type, apiData, apiError } = this.props

        let body = <WidgetLoader />
        if (apiData && !apiError) {
            if (type === 'histogram') {
                body = (
                    <RepoCommitActivityHistogramChart
                        commits={apiData.buckets}
                    />
                )
            } else if (type === 'line') {
                body = <RepoCommitActivityLineChart commits={apiData.buckets} />
            }
        }

        return (
            <Widget>
                <WidgetHeader
                    title={title || 'Commit Activity'}
                    subject={title ? null : repository}
                    icon="line-chart"
                />
                <WidgetBody style={{ overflowY: 'hidden' }}>
                    <TrapApiError error={apiError}>
                        {body}
                    </TrapApiError>
                </WidgetBody>
            </Widget>
        )
    }
}
