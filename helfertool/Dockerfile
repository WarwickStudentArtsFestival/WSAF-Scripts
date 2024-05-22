FROM helfertool/helfertool:latest

RUN echo $(ls /log)
RUN ls /log
RUN ls -al /
COPY helfertool.yaml /config/helfertool.yaml

USER root
RUN chmod 777 /log
RUN chmod 777 /config
RUN chmod 777 /data

USER helfertool
#ENTRYPOINT ["/usr/local/bin/helfertool"]
#CMD ["run"]

#HEALTHCHECK --interval=30s --timeout=30s --start-period=10s --retries=3 CMD ["/usr/local/bin/healthcheck"]